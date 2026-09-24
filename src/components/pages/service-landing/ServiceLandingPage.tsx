"use client";

import type { ServiceLandingContent } from "@/lib/service-landing-types";
import { ServiceBenefitsShowcase } from "@/components/pages/service-landing/ServiceBenefitsShowcase";
import { ServiceFaqBand } from "@/components/pages/service-landing/ServiceFaqBand";
import { ServiceFinalCtaCard } from "@/components/pages/service-landing/ServiceFinalCtaCard";
import { ServiceHowItWorks } from "@/components/pages/service-landing/ServiceHowItWorks";
import { ServiceLandingHero } from "@/components/pages/service-landing/ServiceLandingHero";
import { ServiceNumbersBand } from "@/components/pages/service-landing/ServiceNumbersBand";
import { ServiceProcessStoryRows } from "@/components/pages/service-landing/ServiceProcessStoryRows";
import { ServiceUspScrollStack } from "@/components/pages/service-landing/ServiceUspScrollStack";
import { ServiceWhatWeDoCarousel } from "@/components/pages/service-landing/ServiceWhatWeDoCarousel";

export function ServiceLandingPage({ content }: { content: ServiceLandingContent }) {
  return (
    <div className="service-landing-page relative w-full bg-transparent">
      <div className="relative z-[1]">
        <ServiceLandingHero
          eyebrow={content.eyebrow}
          heroTitle={content.heroTitle}
          heroTitleHighlight={content.heroTitleHighlight}
          heroDescription={content.heroDescription}
          heroDescriptionSecondary={content.heroDescriptionSecondary}
          heroCtaLabel={content.heroCtaLabel}
          heroCtaHref={content.heroCtaHref}
          heroSecondaryCtaLabel={content.heroSecondaryCtaLabel}
          heroSecondaryCtaHref={content.heroSecondaryCtaHref}
          heroTrustBadges={content.heroTrustBadges}
          heroCarouselImages={content.heroCarouselImages}
          crmMarqueeTitle={content.crmCmsMarqueeTitle ?? content.trustHeadline}
        />

        {content.whatWeDo ? (
          <ServiceWhatWeDoCarousel section={content.whatWeDo} cardImages={content.whatWeDoCardImages} />
        ) : null}

        {content.benefitsShowcase ? <ServiceBenefitsShowcase section={content.benefitsShowcase} /> : null}

        <ServiceHowItWorks
          title={content.howItWorksTitle}
          subtitle={content.howItWorksSubtitle}
          steps={content.howItWorksSteps}
        />

        {content.uspStack ? <ServiceUspScrollStack stack={content.uspStack} /> : null}

        <ServiceProcessStoryRows steps={content.processSteps} />

        <ServiceNumbersBand title={content.statsSectionTitle ?? "Numbers to lean on"} stats={content.stats} />

        <ServiceFaqBand title={content.faqTitle} subtitle={content.faqSubtitle} items={content.faqItems} />

        <ServiceFinalCtaCard
          eyebrow={content.finalCtaEyebrow}
          title={content.finalCtaTitle}
          description={content.finalCtaDescription}
          ctaLabel={content.finalCtaLabel}
          ctaHref={content.finalCtaHref}
          secondaryLabel="View all services"
          secondaryHref="/services"
        />
      </div>
    </div>
  );
}
