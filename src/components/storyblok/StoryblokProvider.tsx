"use client";

import { initializeStoryblok } from "@/components/storyblok/storyblok-init";

initializeStoryblok();

export function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
