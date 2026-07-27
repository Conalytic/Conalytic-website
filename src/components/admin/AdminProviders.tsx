"use client";

import { StudioThemeProvider } from "@/components/admin/ui/StudioThemeProvider";
import { StudioToastProvider } from "@/components/admin/ui/StudioToast";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <StudioThemeProvider>
      <StudioToastProvider>{children}</StudioToastProvider>
    </StudioThemeProvider>
  );
}
