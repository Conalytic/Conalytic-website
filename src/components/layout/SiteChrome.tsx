"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isLegalDocumentPath } from "@/lib/legal-routes";
import { PageAmbient } from "@/components/visual/PageAmbient";
import { ScrollRevealInit } from "@/components/layout/ScrollRevealInit";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";

/**
 * Marketing chrome (nav / main / footer / cookie banner). Legal document pages
 * render their own shell and skip this wrapper UI.
 */
export function SiteChrome({
  navbar,
  footer,
  cookieConsent,
  children,
}: {
  navbar: ReactNode;
  footer: ReactNode;
  cookieConsent: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const legal = isLegalDocumentPath(pathname);

  if (legal) {
    return <>{children}</>;
  }

  return (
    <>
      <PageAmbient />
      <ScrollRevealInit />
      <ScrollProgressBar />
      <div className="relative z-[1] flex min-h-full flex-1 flex-col">
        {navbar}
        <main className="min-h-0 w-full flex-1">{children}</main>
        {footer}
      </div>
      {cookieConsent}
    </>
  );
}
