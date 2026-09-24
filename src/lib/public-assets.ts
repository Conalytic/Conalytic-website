/**
 * Canonical URLs for static files under `/public`.
 * Import these instead of hard-coding paths in components and SEO helpers.
 */
export const BRAND_ASSETS = {
  logo: "/brand/logo.png",
  logoWhite: "/brand/logo-white.png",
  logoIcon: "/brand/logo-icon.png",
  /** Navbar wordmark on dark backgrounds */
  logoNavbarDark: "/brand/logo-navbar-dark.png",
  logoTaglineLight: "/brand/logo-tagline-light.png",
  logoTaglineWhite: "/brand/logo-tagline-white.png",
  favicon: "/brand/favicon.png",
  ogImage: "/brand/og-image.png",
} as const;

/** Raster/SVG marketing art (not brand lockups). */
export const IMAGE_ASSETS = {
  servicesBase: "/images/services",
  productsBase: "/images/products",
} as const;
