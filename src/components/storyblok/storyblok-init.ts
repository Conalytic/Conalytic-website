import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import type { SbReactComponentsMap } from "@storyblok/react";
import PageBlock from "@/components/storyblok/blocks/PageBlock";
import SectionBlock from "@/components/storyblok/blocks/SectionBlock";
import HeroBlock from "@/components/storyblok/blocks/HeroBlock";
import RichTextBlock from "@/components/storyblok/blocks/RichTextBlock";
import CtaBlock from "@/components/storyblok/blocks/CtaBlock";
import CardsGridBlock from "@/components/storyblok/blocks/CardsGridBlock";
import CardItemBlock from "@/components/storyblok/blocks/CardItemBlock";
import StatsBlock from "@/components/storyblok/blocks/StatsBlock";
import StatItemBlock from "@/components/storyblok/blocks/StatItemBlock";
import TeaserBlock from "@/components/storyblok/blocks/TeaserBlock";
import GridBlock from "@/components/storyblok/blocks/GridBlock";
import FeatureBlock from "@/components/storyblok/blocks/FeatureBlock";

const components: SbReactComponentsMap = {
  page: PageBlock,
  home_page: PageBlock,
  about_page: PageBlock,
  features_page: PageBlock,
  contact_page: PageBlock,
  careers_page: PageBlock,
  integrations_page: PageBlock,
  blogs_page: PageBlock,
  ats_page: PageBlock,
  report_builder_page: PageBlock,
  conversational_analytics_page: PageBlock,
  section: SectionBlock,
  hero: HeroBlock,
  rich_text: RichTextBlock,
  cta: CtaBlock,
  cards_grid: CardsGridBlock,
  card_item: CardItemBlock,
  stats: StatsBlock,
  stat_item: StatItemBlock,
  teaser: TeaserBlock,
  grid: GridBlock,
  feature: FeatureBlock,
};

let initialized = false;

export function initializeStoryblok() {
  if (initialized) {
    return;
  }

  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
    use: [apiPlugin],
    components,
    enableFallbackComponent: true,
  });

  initialized = true;
}
