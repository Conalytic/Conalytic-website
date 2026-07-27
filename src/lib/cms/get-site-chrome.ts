import type { FooterConfig, NavbarConfig } from "@/lib/site-layout";
import { deepMerge } from "@/lib/cms/deep-merge";
import { DEFAULT_FOOTER_CONFIG, DEFAULT_NAVBAR_CONFIG } from "@/lib/cms/defaults/site-chrome";
import { readCmsJson } from "@/lib/cms/read-cms-file";
import type { CmsFooterOverlay, CmsHeaderOverlay } from "@/lib/cms/types";

export async function getHeaderConfig(overlay?: CmsHeaderOverlay | null): Promise<NavbarConfig> {
  const fromFile = await readCmsJson<CmsHeaderOverlay>("site/header.json");
  const merged = deepMerge(
    DEFAULT_NAVBAR_CONFIG as unknown as Record<string, unknown>,
    (fromFile ?? {}) as Record<string, unknown>,
  ) as unknown as NavbarConfig;
  if (overlay) {
    return deepMerge(merged as unknown as Record<string, unknown>, overlay as unknown as Record<string, unknown>) as unknown as NavbarConfig;
  }
  return merged;
}

export async function getFooterConfig(overlay?: CmsFooterOverlay | null): Promise<FooterConfig> {
  const fromFile = await readCmsJson<CmsFooterOverlay>("site/footer.json");
  const merged = deepMerge(
    DEFAULT_FOOTER_CONFIG as unknown as Record<string, unknown>,
    (fromFile ?? {}) as Record<string, unknown>,
  ) as unknown as FooterConfig;
  if (overlay) {
    return deepMerge(merged as unknown as Record<string, unknown>, overlay as unknown as Record<string, unknown>) as unknown as FooterConfig;
  }
  return merged;
}
