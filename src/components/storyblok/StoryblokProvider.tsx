"use client";

/**
 * StoryblokProvider
 *
 * Initialises the Storyblok JS bridge for the Visual Editor live-preview.
 * This only runs on the client; RSC pages still fetch content server-side
 * via src/lib/storyblok.ts.
 *
 * HOW TO REGISTER BLOCK COMPONENTS
 * ---------------------------------
 * 1. Create a component in src/components/storyblok/blocks/
 * 2. Import it here and add it to the `components` object
 * 3. The key must match the Storyblok block's "technical name"
 *
 * Example:
 *   import HeroBlock from "./blocks/HeroBlock";
 *   const components = { hero: HeroBlock };
 */

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import type { SbReactComponentsMap } from "@storyblok/react";

const components: SbReactComponentsMap = {
  // Register your Storyblok block components here.
  // The key = Storyblok block technical name, value = React component.
  //
  // Example:
  // "hero": HeroBlock,
  // "feature-grid": FeatureGrid,
  // "testimonials": TestimonialsBlock,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components,
});

export function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
