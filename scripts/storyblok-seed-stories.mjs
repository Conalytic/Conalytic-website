import crypto from "node:crypto";

const token = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const spaceId = process.env.STORYBLOK_SPACE_ID;

if (!token || !spaceId) {
  console.error("Missing env vars: STORYBLOK_MANAGEMENT_TOKEN and STORYBLOK_SPACE_ID are required.");
  process.exit(1);
}

const baseUrl = `https://mapi.storyblok.com/v1/spaces/${spaceId}`;

function uid() {
  return crypto.randomUUID();
}

function link(url, target) {
  return {
    linktype: "url",
    url,
    cached_url: url,
    ...(target ? { target } : {}),
  };
}

async function api(pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    ...options,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Storyblok API ${response.status} ${pathname}: ${body}`);
  }

  if (response.status === 204) {
    return {};
  }

  return response.json();
}

async function fetchAllStories() {
  const all = [];
  let page = 1;

  while (true) {
    const data = await api(`/stories?page=${page}&per_page=100`);
    const stories = data.stories || [];
    all.push(...stories);

    if (stories.length < 100) {
      break;
    }

    page += 1;
  }

  return all;
}

async function publishStory(storyId) {
  try {
    await api(`/stories/${storyId}/publish`);
  } catch (error) {
    console.warn(`Failed to publish story ${storyId}:`, error.message);
  }
}

/** Human-readable folder names in the Storyblok tree (slug path stays technical). */
const FOLDER_TITLES = {
  globals: "Site settings",
  pages: "Website",
  "pages/content": "Core pages",
  "pages/products": "Product pages",
  blogs: "Blog articles",
};

function folderDisplayName(fullSlug) {
  if (FOLDER_TITLES[fullSlug]) {
    return FOLDER_TITLES[fullSlug];
  }
  const leaf = fullSlug.split("/").filter(Boolean).pop() || fullSlug;
  return leaf.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Flat `pages/<x>` stories replaced by `pages/content/<x>` — removed after seed if canonical exists. */
const LEGACY_FLAT_PAGE_SLUGS = [
  "pages/home",
  "pages/features",
  "pages/about-us",
  "pages/contact",
  "pages/careers",
  "pages/integrations",
  "pages/blogs",
  "pages/cookies",
];

async function main() {
  console.log("Fetching existing stories...");
  const existingStories = await fetchAllStories();
  const byFullSlug = new Map(existingStories.map((story) => [story.full_slug || story.slug, story]));

  async function ensureFolder(fullSlug) {
    const existing = byFullSlug.get(fullSlug);
    if (existing) {
      return existing;
    }

    const parts = fullSlug.split("/").filter(Boolean);
    const slug = parts[parts.length - 1];
    const parentSlug = parts.slice(0, -1).join("/");
    const parent = parentSlug ? await ensureFolder(parentSlug) : null;
    const name = folderDisplayName(fullSlug);

    console.log(`Creating folder: ${fullSlug}`);
    const response = await api("/stories", {
      method: "POST",
      body: JSON.stringify({
        story: {
          name,
          slug,
          is_folder: true,
          parent_id: parent ? parent.id : 0,
        },
      }),
    });

    const created = response.story;
    byFullSlug.set(created.full_slug || created.slug, created);
    return created;
  }

  async function upsertStory({ fullSlug, name, component, content, publish = true }) {
    const parts = fullSlug.split("/").filter(Boolean);
    const slug = parts[parts.length - 1];
    const parentSlug = parts.slice(0, -1).join("/");
    const parent = parentSlug ? await ensureFolder(parentSlug) : null;

    const existing = byFullSlug.get(fullSlug);

    if (existing) {
      console.log(`Updating story: ${fullSlug}`);
      const response = await api(`/stories/${existing.id}`, {
        method: "PUT",
        body: JSON.stringify({
          story: {
            name,
            slug,
            parent_id: parent ? parent.id : 0,
            content,
            component,
          },
        }),
      });

      const updated = response.story;
      byFullSlug.set(fullSlug, updated);
      if (publish) {
        await publishStory(updated.id);
      }
      return updated;
    }

    console.log(`Creating story: ${fullSlug}`);
    const response = await api("/stories", {
      method: "POST",
      body: JSON.stringify({
        story: {
          name,
          slug,
          parent_id: parent ? parent.id : 0,
          content,
          component,
        },
      }),
    });

    const created = response.story;
    byFullSlug.set(fullSlug, created);
    if (publish) {
      await publishStory(created.id);
    }
    return created;
  }

  await ensureFolder("globals");
  await ensureFolder("pages");
  await ensureFolder("pages/content");
  await ensureFolder("pages/products");
  await ensureFolder("blogs");

  await upsertStory({
    fullSlug: "globals/site-config",
    name: "Site Config",
    component: "site_config",
    content: {
      _uid: uid(),
      component: "site_config",
      navbar_links: [
        { _uid: uid(), component: "nav_link", label: "Home", link: link("/") },
        { _uid: uid(), component: "nav_link", label: "Features", link: link("/features") },
        { _uid: uid(), component: "nav_link", label: "Blogs", link: link("/blogs") }
      ],
      navbar_login_label: "Login",
      navbar_login_link: link("https://app.conalytic.com/login", "_blank"),
      navbar_primary_cta_label: "Book A Demo",
      navbar_primary_cta_link: link("/contact"),
      footer_email: "admin@conalytic.com",
      footer_columns: [
        {
          _uid: uid(),
          component: "footer_column",
          title: "Company",
          links: [
            { _uid: uid(), component: "nav_link", label: "Home", link: link("/") },
            { _uid: uid(), component: "nav_link", label: "Features", link: link("/features") },
            { _uid: uid(), component: "nav_link", label: "About Us", link: link("/about-us") }
          ]
        },
        {
          _uid: uid(),
          component: "footer_column",
          title: "Resources",
          links: [
            { _uid: uid(), component: "nav_link", label: "Blogs", link: link("/blogs") },
            { _uid: uid(), component: "nav_link", label: "Integrations", link: link("/integrations") },
            { _uid: uid(), component: "nav_link", label: "Contact", link: link("/contact") }
          ]
        }
      ],
      footer_social_links: [
        { _uid: uid(), component: "social_link", label: "LinkedIn", link: link("https://linkedin.com/company/conalytic", "_blank") },
        { _uid: uid(), component: "social_link", label: "X", link: link("https://twitter.com/conalytic", "_blank") }
      ],
      footer_legal_links: [
        { _uid: uid(), component: "nav_link", label: "Terms", link: link("https://chat.conalytic.com/terms-of-service", "_blank") },
        { _uid: uid(), component: "nav_link", label: "Privacy", link: link("https://chat.conalytic.com/privacy-and-policy", "_blank") },
        { _uid: uid(), component: "nav_link", label: "Cookies", link: link("/cookies") }
      ],
      footer_copyright: "© 2026 Conalytic. All rights reserved.",
      site_scripts_head: [],
      site_scripts_body_start: [],
      site_scripts_body_end: [],
      cookie_banner_heading: "Cookies & privacy.",
      cookie_banner_message:
        "We use essential cookies so the site works, and a short technical cookie if you open this site from the Storyblok editor. We don't run third-party marketing cookies on this marketing site today.",
      cookie_banner_policy_link_label: "Cookies Policy",
      cookie_banner_essential_label: "Essential only",
      cookie_banner_accept_all_label: "Accept all"
    }
  });

  await upsertStory({
    fullSlug: "pages/content/home",
    name: "Home",
    component: "home_page",
    content: {
      _uid: uid(),
      component: "home_page",
      title: "Conalytic – AI-Powered Conversational Analytics Platform",
      description: "Transform fragmented dashboards into one conversational analytics experience.",
      seo_title: "Conalytic – AI-Powered Conversational Analytics Platform",
      seo_description: "Ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console.",
      use_storyblok_page: false,
      home_hero_title_line_1: "Unlocking Growth With",
      home_hero_title_line_2: "Next-Gen Analytics",
      home_hero_subtitle: "Ask questions in plain English and get instant insights from GA4, Google Ads, Meta and Search Console — no SQL required.",
      home_hero_primary_cta_label: "Get started",
      home_hero_primary_cta_href: "https://app.conalytic.com",
      home_hero_secondary_cta_label: "Book a demo",
      home_hero_secondary_cta_href: "/contact",
      home_trusted_by_title: "Integration Partners",
      home_services_title_line_1: "Discover our range of tailored",
      home_services_title_line_2: "analytics services",
      home_transformation_eyebrow: "The turning point",
      home_transformation_title_line_1: "The same data.",
      home_transformation_title_line_2: "A completely different outcome.",
      home_how_it_works_eyebrow: "How it works",
      home_how_it_works_title: "From question to insight in seconds",
      home_how_it_works_subtitle: "No SQL. No dashboards. No data team required. Just ask — and get an answer your whole team can act on.",
      home_integrations_title_line_1: "Seamless integration with",
      home_integrations_title_line_2: "your marketing stack",
      home_integrations_subtitle: "Connect all your data sources — no engineering required.",
      home_integrations_cta_label: "View all integrations",
      home_testimonials_title_line_1: "What our customers say",
      home_testimonials_title_line_2: "about us",
      home_testimonials_subtitle: "Improve marketing performance with AI-powered insights, helping teams make smarter decisions faster.",
      home_testimonials_json: JSON.stringify([
        {
          quote: "Conalytic replaced our entire dashboard stack. One conversation gives insights that used to take hours across 4 different platforms. Absolutely game-changing for our team.",
          name: "Maria Rodriguez",
          title: "Marketing Manager",
          photo: "https://i.pravatar.cc/300?img=47",
          rating: 5
        },
        {
          quote: "Client retention improved 40% after implementing Conalytic's automated reporting. The AI insights add incredible value to every single client deliverable we produce.",
          name: "Jennifer Walsh",
          title: "Marketing Operations Lead",
          photo: "https://i.pravatar.cc/300?img=44",
          rating: 5
        }
      ]),
      home_pricing_eyebrow: "Pricing",
      home_pricing_title: "Simple, transparent pricing",
      home_faq_title: "Frequently asked questions",
      home_faq_subtitle: "Everything you need to know about Conalytic.",
      home_faq_items_json: JSON.stringify([
        {
          question: "How quickly can we see results?",
          answer: "Connect your data sources in under 5 minutes. Start getting insights immediately through our conversational interface — no onboarding or training required."
        },
        {
          question: "What makes your AI insights different?",
          answer: "Our AI doesn't just show data – it explains trends, identifies opportunities, and provides specific recommendations for optimization. Think of it as a senior analyst available 24/7."
        }
      ]),
      home_faq_contact_prefix: "Still have questions?",
      home_faq_contact_label: "Talk to our team",
      home_cta_title: "Turn data into decisions. In seconds, not days.",
      home_cta_subtitle: "Join thousands of teams who replaced their entire dashboard stack with a single conversation.",
      home_cta_primary_label: "Get started",
      home_cta_primary_href: "https://app.conalytic.com/signup",
      home_cta_secondary_label: "Book a demo",
      home_cta_secondary_href: "/contact",
      home_marquee_logos: [],
      body: [
        {
          _uid: uid(),
          component: "section",
          padding: "lg",
          background: "default",
          width: "default",
          body: [
            {
              _uid: uid(),
              component: "hero",
              kicker: "Conversational Analytics",
              title: "Ask your data. Get answers in seconds.",
              subtitle: "Conalytic connects all your marketing sources and lets your team query performance in plain English.",
              primary_cta_label: "Book A Demo",
              primary_cta_link: link("/contact"),
              secondary_cta_label: "Explore Features",
              secondary_cta_link: link("/features"),
              align: "center"
            }
          ]
        }
      ]
    }
  });

  await upsertStory({
    fullSlug: "pages/content/features",
    name: "Features",
    component: "features_page",
    content: {
      _uid: uid(),
      component: "features_page",
      title: "Features – Conalytic",
      description: "Everything your team needs to analyze and report faster.",
      seo_title: "Features – Conalytic",
      seo_description: "From conversational queries to automated reporting, Conalytic gives your team a faster analytics workflow.",
      use_storyblok_page: false,
      features_hero_badge: "Platform Features",
      features_hero_title_line_1: "Features That Make Analytics",
      features_hero_title_line_2: "Fun, Easy & Productive!",
      features_hero_subtitle: "From connecting data to real-time conversations and report building, Conalytic has everything your team needs to thrive.",
      features_hero_primary_cta_label: "Try It Free Today",
      features_included_title: "One platform, every capability you need",
      features_included_subtitle: "Everything included",
      features_cta_title: "Turn data into decisions. In seconds, not days.",
      features_cta_subtitle: "Join thousands of teams who replaced their entire dashboard stack with a single conversation.",
      body: [
        {
          _uid: uid(),
          component: "section",
          padding: "lg",
          background: "muted",
          width: "wide",
          body: [
            {
              _uid: uid(),
              component: "cards_grid",
              title: "Core Features",
              subtitle: "Build clarity from your data stack with production-ready analytics tooling.",
              columns: "3",
              items: [
                {
                  _uid: uid(),
                  component: "card_item",
                  title: "Conversational Analytics",
                  description: "Ask performance questions in plain English and receive instant insights.",
                  cta_label: "Learn more",
                  cta_link: link("/products/conversational-analytics")
                },
                {
                  _uid: uid(),
                  component: "card_item",
                  title: "Report Builder",
                  description: "Coming soon — generate polished reports with AI commentary and white-label branding.",
                  cta_label: "Learn more",
                  cta_link: link("/products/report-builder")
                },
                {
                  _uid: uid(),
                  component: "card_item",
                  title: "Data Integrations",
                  description: "Connect GA4, Google Ads, Meta Ads, and Search Console in one view.",
                  cta_label: "Explore integrations",
                  cta_link: link("/integrations")
                }
              ]
            }
          ]
        }
      ]
    }
  });

  const additionalPages = [
    {
      fullSlug: "pages/content/about-us",
      name: "About Us",
      component: "about_page",
      content: {
        _uid: uid(),
        component: "about_page",
        title: "About Us – Conalytic",
        description: "Learn about Conalytic's mission, team, and story.",
        seo_title: "About Us – Conalytic",
        seo_description: "At Conalytic, we're building tools that empower teams to analyze, create, and succeed together.",
        use_storyblok_page: false,
        about_hero_badge: "Our Story",
        about_hero_title_line_1: "Reimagining How",
        about_hero_title_line_2: "Analytics Work Together",
        about_hero_subtitle: "At Conalytic, we're passionate about building tools that empower teams to analyze, create, and succeed—together.",
        about_story_badge: "How It All Started",
        about_story_title: "Built by marketers, for marketers",
        about_team_badge: "The Team",
        about_team_title: "Meet the People Behind Conalytic",
        about_team_subtitle: "Passionate builders on a mission to democratize marketing intelligence for every team on the planet.",
        about_cta_title: "Turn data into decisions. In seconds, not days.",
        about_cta_subtitle: "Join thousands of teams who replaced their entire dashboard stack with a single conversation.",
      }
    },
    {
      fullSlug: "pages/content/contact",
      name: "Contact",
      component: "contact_page",
      content: {
        _uid: uid(),
        component: "contact_page",
        title: "Contact Us – Conalytic",
        description: "Get in touch with Conalytic.",
        seo_title: "Contact Us – Conalytic",
        seo_description: "Have questions, feedback, or want to connect with the Conalytic team?",
        use_storyblok_page: false,
        contact_hero_badge: "Get in Touch",
        contact_hero_title_line_1: "We're Here to",
        contact_hero_title_line_2: "Help!",
        contact_hero_subtitle: "Have questions, feedback, or just want to say hi? Let's connect!",
        contact_form_title: "Schedule a call",
        contact_cta_title: "Ready to Transform Your Analytics?",
        contact_cta_subtitle: "Join 2,000+ teams already using Conalytic to turn data into decisions",
      }
    },
    {
      fullSlug: "pages/content/careers",
      name: "Careers",
      component: "careers_page",
      content: {
        _uid: uid(),
        component: "careers_page",
        title: "Careers – Conalytic",
        description: "Join Conalytic and help redefine analytics.",
        seo_title: "Careers – Conalytic",
        seo_description: "Explore open positions at Conalytic and join our mission to democratize analytics.",
        use_storyblok_page: false,
        careers_hero_badge: "We're Hiring",
        careers_hero_title_line_1: "Join Our Mission to",
        careers_hero_title_line_2: "Redefine Analytics",
        careers_hero_subtitle: "At Conalytic, we're not just building analytics tools—we're democratizing data insights for every marketer. Let's build the future together.",
        careers_hero_button_label: "See Open Positions",
        careers_life_title: "Why You'll Love Building the Future with Us",
        careers_life_subtitle: "We're a team of data scientists, product innovators, and marketing experts—here's why talented people choose Conalytic.",
        careers_open_positions_title: "Open Positions",
        careers_open_positions_subtitle: "Find your next opportunity at Conalytic",
        careers_cta_title: "Ready to Transform Your Analytics?",
        careers_cta_subtitle: "Join 2,000+ teams already using Conalytic to turn data into decisions",
      }
    },
    {
      fullSlug: "pages/content/integrations",
      name: "Integrations",
      component: "integrations_page",
      content: {
        _uid: uid(),
        component: "integrations_page",
        title: "Integrations – Conalytic",
        description: "Connect Conalytic with your existing stack.",
        seo_title: "Integrations – Conalytic",
        seo_description: "Integrate GA4, Google Ads, Meta Ads, Search Console, and more with Conalytic.",
        use_storyblok_page: false,
        integrations_hero_badge: "Integrations",
        integrations_hero_title_line_1: "Work Better Together with",
        integrations_hero_title_line_2: "Seamless Integrations",
        integrations_hero_subtitle: "Connect Conalytic to the tools your team already loves and streamline your workflow in one place.",
        integrations_cta_title: "Why Choose Conalytic?",
        integrations_cta_subtitle: "Built for teams who want to work smarter, faster, and happier with their marketing data",
      }
    },
    {
      fullSlug: "pages/products/applicant-tracking-system",
      name: "Applicant Tracking System",
      component: "ats_page",
      content: {
        _uid: uid(),
        component: "ats_page",
        title: "Applicant Tracking System – Conalytic",
        description: "AI-powered ATS for modern hiring teams.",
        seo_title: "Applicant Tracking System – Conalytic",
        seo_description: "Streamline sourcing, screening, and hiring with Conalytic ATS.",
        use_storyblok_page: false,
        ats_hero_badge: "Coming soon",
        ats_hero_title_line_1: "Applicant Tracking System for",
        ats_hero_title_line_2: "Modern Teams",
        ats_hero_subtitle: "Streamline your entire recruitment process with AI-powered tools that help you source, screen, and hire the best talent faster. Built natively inside Conalytic so your hiring data lives alongside your marketing intelligence.",
        ats_hero_primary_cta_label: "Get Early Access",
        ats_hero_secondary_cta_label: "Book a Demo",
        ats_features_title: "Everything You Need to Hire Smarter",
        ats_features_subtitle: "From first application to signed offer, Conalytic ATS handles every step of your recruitment workflow.",
        ats_cta_title: "Be First to Access Conalytic ATS",
        ats_cta_subtitle: "Join the waitlist and get early access when we launch",
      }
    },
    {
      fullSlug: "pages/products/report-builder",
      name: "Report Builder",
      component: "report_builder_page",
      content: {
        _uid: uid(),
        component: "report_builder_page",
        title: "Report Builder – Conalytic",
        description: "Create branded analytics reports in minutes.",
        seo_title: "Report Builder – Conalytic",
        seo_description: "Build and automate white-label analytics reports with AI-generated insights.",
        use_storyblok_page: false,
        report_builder_hero_badge: "Coming soon",
        report_builder_hero_title_line_1: "Professional Report Builder &",
        report_builder_hero_title_line_2: "Automated Analytics Reporting",
        report_builder_hero_subtitle: "Transform your marketing reports from static data dumps into intelligent, branded presentations that clients actually read.",
        report_builder_hero_secondary_subtitle: "Perfect for agencies delivering client reports and marketing teams presenting to executives. Create stunning, white-label reports in minutes instead of hours.",
        report_builder_core_features_title: "Reporting that practically writes itself",
        report_builder_core_features_subtitle: "Core Features",
        report_builder_value_title: "Want to save 20+ hours weekly on report creation?",
        report_builder_value_subtitle: "Eliminate manual reporting with intelligent report automation. Replace time-consuming copy-paste workflows with AI-powered report generation.",
        report_builder_cta_title: "Turn data into decisions. In seconds, not days.",
        report_builder_cta_subtitle: "Join thousands of teams who replaced their entire dashboard stack with a single conversation.",
      }
    },
    {
      fullSlug: "pages/products/conversational-analytics",
      name: "Conversational Analytics",
      component: "conversational_analytics_page",
      content: {
        _uid: uid(),
        component: "conversational_analytics_page",
        title: "Conversational Analytics – Conalytic",
        description: "Ask analytics questions in plain English and get answers instantly.",
        seo_title: "Conversational Analytics – Conalytic",
        seo_description: "Turn marketing data into conversations with AI-powered analytics.",
        use_storyblok_page: false,
        conversational_analytics_hero_badge: "AI-Powered Analytics",
        conversational_analytics_hero_title_line_1: "Conversational Analytics &",
        conversational_analytics_hero_title_line_2: "Marketing Intelligence Platform",
        conversational_analytics_hero_subtitle: "Transform how your team analyzes marketing data with AI-powered conversations. Conalytic lets you ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console.",
        conversational_analytics_hero_secondary_subtitle: "This isn't just a static dashboard — it's your intelligent analytics partner that turns complex data queries into simple conversations, helping you make data-driven decisions faster than ever before.",
        conversational_analytics_core_capabilities_subtitle: "Core Capabilities",
        conversational_analytics_core_capabilities_title: "Everything you need to understand your marketing data",
        conversational_analytics_cta_title: "Turn data into decisions. In seconds, not days.",
        conversational_analytics_cta_subtitle: "Join thousands of teams who replaced their entire dashboard stack with a single conversation.",
      }
    }
  ];

  for (const page of additionalPages) {
    await upsertStory({
      fullSlug: page.fullSlug,
      name: page.name,
      component: page.component,
      content: page.content,
    });
  }

  await upsertStory({
    fullSlug: "pages/content/blogs",
    name: "Blogs",
    component: "blogs_page",
    content: {
      _uid: uid(),
      component: "blogs_page",
      title: "Blog – Conalytic",
      description: "Insights, strategies, and updates from the Conalytic team.",
      seo_title: "Blog – Conalytic",
      seo_description: "Read analytics tips, trends, and practical guides from the Conalytic team.",
      use_storyblok_page: false,
      blogs_hero_badge: "Blog",
      blogs_hero_title_line_1: "Insights & Tips to",
      blogs_hero_title_line_2: "Supercharge Your Analytics",
      blogs_hero_subtitle: "Explore the latest trends in marketing analytics, productivity hacks, and updates from Conalytic.",
      body: [
        {
          _uid: uid(),
          component: "section",
          padding: "lg",
          background: "default",
          width: "default",
          body: [
            {
              _uid: uid(),
              component: "hero",
              kicker: "Blog",
              title: "Insights to supercharge your analytics",
              subtitle: "Explore practical guides, playbooks, and trends for modern marketing teams.",
              primary_cta_label: "Read latest",
              primary_cta_link: link("/how-to-build-a-thriving-remote-team-culture-10"),
              secondary_cta_label: "Contact us",
              secondary_cta_link: link("/contact"),
              align: "center"
            }
          ]
        }
      ]
    }
  });

  await upsertStory({
    fullSlug: "pages/content/cookies",
    name: "Cookies Policy",
    component: "cookies_page",
    content: {
      _uid: uid(),
      component: "cookies_page",
      title: "Cookies Policy – Conalytic",
      description:
        "Conalytic uses cookies and similar technologies to enhance your experience and analyze how our services are used.",
      seo_title: "Cookies Policy – Conalytic",
      seo_description:
        "Learn how Conalytic uses cookies, how to manage preferences, and how to contact us about cookie practices.",
      use_storyblok_page: false,
      cookies_kicker: "Legal",
      cookies_page_title: "Cookies Policy",
      cookies_last_updated: "Last Updated: October 01, 2024",
      cookies_intro:
        "This marketing site uses a small set of cookies and similar technologies. When you first visit, you can choose Essential only or Accept all in the banner; your choice is stored in your browser (local storage). If you open the site from the Storyblok Visual Editor, a short technical cookie may be set so draft content can load. For full details, read the sections below.",
      cookies_toc_json: JSON.stringify([
        { id: "what-are-cookies", title: "What Are Cookies?" },
        { id: "types", title: "Types of Cookies We Use" },
        { id: "why-we-use", title: "Why We Use Cookies" },
        { id: "managing", title: "Managing Your Preferences" },
        { id: "updates", title: "Updates to This Policy" },
        { id: "contact", title: "Contact Us" }
      ]),
      cookies_what_heading: "What Are Cookies?",
      cookies_what_body:
        "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve functionality, and provide a more personalized experience. Cookies can be temporary (session cookies) or stored on your device for a longer period (persistent cookies).",
      cookies_types_section_heading: "Types of Cookies We Use",
      cookies_types_json: JSON.stringify([
        {
          name: "Essential Cookies",
          description:
            "These cookies are necessary for the platform to function properly. They enable core features such as account login and security."
        },
        {
          name: "Performance Cookies",
          description:
            "These cookies collect information about how users interact with our platform. We use this data to improve functionality and optimize user experience."
        },
        {
          name: "Functional Cookies",
          description:
            "These cookies remember your preferences, such as language or region settings, to make your experience more personalized."
        },
        {
          name: "Marketing Cookies",
          description:
            "These cookies help us deliver relevant advertisements and measure the effectiveness of our marketing campaigns."
        }
      ]),
      cookies_why_heading: "Why We Use Cookies",
      cookies_why_intro: "We use cookies to:",
      cookies_why_list_json: JSON.stringify([
        "Enable core functionality, such as secure login and navigation.",
        "Analyze how users engage with our platform to improve performance.",
        "Remember user preferences for a personalized experience.",
        "Deliver targeted content and advertisements relevant to your interests."
      ]),
      cookies_managing_heading: "Managing Your Cookie Preferences",
      cookies_managing_intro:
        "You have control over how cookies are used. Most web browsers allow you to manage or disable cookies through their settings. Please note that disabling essential cookies may affect the functionality of Conalytic. To manage cookies in your browser:",
      cookies_browser_help_json: JSON.stringify([
        { browser: "Chrome", steps: "Settings → Privacy and Security → Cookies and other site data" },
        { browser: "Firefox", steps: "Preferences → Privacy & Security → Cookies and Site Data" },
        { browser: "Safari", steps: "Preferences → Privacy → Manage Website Data" }
      ]),
      cookies_updates_heading: "Updates to This Policy",
      cookies_updates_body:
        "We may update this Cookies Policy to reflect changes in our practices or legal requirements. Any updates will be posted on this page, and we encourage you to review the policy periodically.",
      cookies_contact_heading: "Contact Us",
      cookies_contact_lead: "If you have questions or concerns about our use of cookies, please contact us at:",
      cookies_contact_email: "admin@conalytic.com",
      body: []
    }
  });

  await upsertStory({
    fullSlug: "blogs/how-to-build-a-thriving-remote-team-culture-10",
    name: "How to Build a Thriving Remote Team Culture",
    component: "blog_post",
    content: {
      _uid: uid(),
      component: "blog_post",
      title: "How to Build a Thriving Remote Team Culture",
      category: "Collaboration",
      read_time: "5 min read",
      excerpt: "Explore practical ways to improve productivity, trust, and alignment across distributed teams.",
      seo_title: "How to Build a Thriving Remote Team Culture",
      seo_description: "A practical guide to building strong remote team culture using communication, analytics, and accountability.",
      body_rich_text: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Remote culture does not happen by default. It is built through deliberate systems, transparent communication, and measurable feedback loops."
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Teams that align daily on goals and outcomes tend to move faster with less confusion. Shared analytics helps everyone speak the same language."
              }
            ]
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "When data is easy to access and decisions are visible, remote collaboration improves dramatically across marketing, product, and leadership."
              }
            ]
          }
        ]
      }
    }
  });

  async function removeLegacyFlatPages() {
    for (const legacySlug of LEGACY_FLAT_PAGE_SLUGS) {
      const legacy = byFullSlug.get(legacySlug);
      if (!legacy || legacy.is_folder) {
        continue;
      }
      const segment = legacySlug.replace(/^pages\//, "");
      const canonical = `pages/content/${segment}`;
      if (!byFullSlug.has(canonical)) {
        continue;
      }
      console.log(`Removing legacy story (replaced by ${canonical}): ${legacySlug}`);
      try {
        const delRes = await fetch(`${baseUrl}/stories/${legacy.id}`, {
          method: "DELETE",
          headers: { Authorization: token },
        });
        if (!delRes.ok) {
          const body = await delRes.text();
          console.warn(`Could not remove ${legacySlug}: ${delRes.status} ${body}`);
          continue;
        }
        byFullSlug.delete(legacySlug);
      } catch (error) {
        console.warn(`Could not remove ${legacySlug}:`, error.message);
      }
    }
  }

  await removeLegacyFlatPages();

  console.log("Seed stories completed successfully.");
}

main().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
