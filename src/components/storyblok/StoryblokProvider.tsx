"use client";

/** Client boundary that ensures `storyblok-init` runs once for any subtree that needs live Storyblok bridge (dev). */
import { initializeStoryblok } from "@/components/storyblok/storyblok-init";

initializeStoryblok();

export function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
