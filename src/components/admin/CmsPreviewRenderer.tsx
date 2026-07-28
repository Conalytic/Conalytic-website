import { HomeClient, type HomeContentPreset } from "@/components/home/HomeClient";
import { FeaturesClient, type FeaturesContentPreset } from "@/components/pages/FeaturesClient";
import { IntegrationsPageClient, type IntegrationsContentPreset } from "@/components/pages/IntegrationsPageClient";
import { AboutClient, type AboutContentPreset } from "@/components/pages/AboutClient";
import { ContactClient, type ContactContentPreset } from "@/components/pages/ContactClient";
import { CareersClient, type CareersContentPreset } from "@/components/pages/CareersClient";
import { BlogsClient, type BlogsContentPreset } from "@/components/pages/BlogsClient";
import { CookiesClient } from "@/components/pages/CookiesClient";
import { ConversationalAnalyticsClient, type ConversationalAnalyticsContentPreset } from "@/components/products/ConversationalAnalyticsClient";
import { ReportBuilderClient, type ReportBuilderContentPreset } from "@/components/pages/ReportBuilderClient";
import { ATSClient, type ATSContentPreset } from "@/components/pages/ATSClient";
import { BlogArticleLayout } from "@/components/blog/BlogArticleLayout";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getRegistryEntryById } from "@/lib/cms/page-registry";
import { getFooterConfig, getHeaderConfig } from "@/lib/cms/get-site-chrome";
import { getDraft } from "@/lib/cms/draft-store";
import { getAdminSession } from "@/lib/admin/session";
import { getMergedRegistryData } from "@/lib/cms/merge-content";
import { mergeBlogPost } from "@/lib/cms/get-page-content";
import { getBlogPostBySlug, STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { extractMarkdownH2Headings } from "@/lib/blog-headings";
import type { CmsHeaderOverlay, CmsFooterOverlay } from "@/lib/cms/types";
import { KpisTrackerClient } from "@/components/pages/KpisTrackerClient";

type PreviewProps = {
  registryId?: string;
  chrome?: "header" | "footer";
};

export async function CmsPreviewRenderer({ registryId, chrome }: PreviewProps) {
  const session = await getAdminSession();
  const sessionId = String(session.loggedInAt || "admin");

  const headerDraft = await getDraft(sessionId, "chrome-header");
  const footerDraft = await getDraft(sessionId, "chrome-footer");
  const headerConfig = await getHeaderConfig((headerDraft?.data as CmsHeaderOverlay) ?? null);
  const footerConfig = await getFooterConfig((footerDraft?.data as CmsFooterOverlay) ?? null);

  if (chrome === "header" || chrome === "footer") {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        {chrome === "header" ? <Navbar config={headerConfig} brandLogos={null} preview /> : null}
        <main className="px-6 py-16 text-center text-[var(--muted-fg)]">
          <p className="text-lg">Sample page content — preview how {chrome} looks site-wide.</p>
        </main>
        {chrome === "footer" ? <Footer config={footerConfig} brandLogos={null} /> : null}
      </div>
    );
  }

  if (!registryId) return <p className="p-8">No preview target.</p>;

  const entry = getRegistryEntryById(registryId);
  if (!entry) return <p className="p-8">Unknown page.</p>;

  if (entry.type === "robots") {
    const merged = await getMergedRegistryData(registryId, sessionId);
    const body = typeof merged?.body === "string" ? merged.body : "";
    return (
      <div
        className="min-h-screen bg-[var(--bg)] p-6 text-[var(--muted-fg)]"
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm text-[var(--muted-fg)]">
            Preview of production <code className="rounded bg-[var(--studio-border)] px-1 py-0.5 text-xs">/robots.txt</code>
            (staging deploys always use <code className="text-xs">Disallow: /</code>).
          </p>
          <pre
            className="overflow-auto rounded-lg border border-[var(--studio-border)] bg-[var(--studio-surface)] p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-[var(--studio-fg)]"
          >
            {body}
          </pre>
        </div>
      </div>
    );
  }

  const merged = await getMergedRegistryData(registryId, sessionId);
  const sections = (merged?.sections as Record<string, unknown> | undefined) ?? {};
  const layout = merged?.layout as { sectionOrder?: string[] } | undefined;

  const shell = (body: React.ReactNode) => (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar config={headerConfig} brandLogos={null} />
      {body}
      <Footer config={footerConfig} brandLogos={null} />
    </div>
  );

  switch (entry.id) {
    case "home":
      return shell(
        <HomeClient content={sections as HomeContentPreset} sectionOrder={layout?.sectionOrder} />,
      );
    case "features":
      return shell(<FeaturesClient content={sections as FeaturesContentPreset} />);
    case "integrations":
      return shell(<IntegrationsPageClient content={sections as IntegrationsContentPreset} />);
    case "about":
      return shell(<AboutClient content={sections as AboutContentPreset} />);
    case "contact":
      return shell(<ContactClient content={sections as ContactContentPreset} />);
    case "careers":
      return shell(<CareersClient content={sections as CareersContentPreset} />);
    case "brand":
      return shell(<div className="p-8 text-center text-sm text-[var(--muted-fg)]">Brand page preview uses site defaults.</div>);
    case "cookies":
      return shell(<CookiesClient content={sections} />);
    case "blogs":
      return shell(<BlogsClient content={sections as BlogsContentPreset} />);
    case "product-chat":
      return shell(<ConversationalAnalyticsClient content={sections as ConversationalAnalyticsContentPreset} />);
    case "product-kpis":
      return shell(<KpisTrackerClient />);
    case "product-reports":
      return shell(<ReportBuilderClient content={sections as ReportBuilderContentPreset} />);
    case "product-ats":
      return shell(<ATSClient content={sections as ATSContentPreset} />);
    case "privacy":
    case "terms":
      return shell(
        <div className="p-8 text-sm text-[var(--muted-fg)]">
          Legal pages keep their structure in code. SEO and intro copy can be edited from the CMS overlay when exported.
        </div>,
      );
    default:
      if (entry.type === "blog") {
        const slug = entry.path.replace(/^\//, "");
        const base = getBlogPostBySlug(slug);
        if (!base) return shell(<p className="p-8">Blog not found.</p>);
        const post = mergeBlogPost(base, merged ?? undefined);
        const headings = extractMarkdownH2Headings(post.bodyMarkdown);
        const related = STATIC_BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);
        return shell(<BlogArticleLayout post={post} headings={headings} related={related} />);
      }
      return shell(<p className="p-8">Preview not available for this entry.</p>);
  }
}
