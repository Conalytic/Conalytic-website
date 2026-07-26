/** Consistent, descriptive alt text for marketing images (SEO + accessibility). */

export function integrationLogoAlt(platformName: string): string {
  return `${platformName} integration logo`;
}

export function conalyticLogoAlt(variant: string): string {
  return `Conalytic ${variant} logo`;
}

export function testimonialPhotoAlt(name: string, title: string): string {
  return `Profile photo of ${name}, ${title}`;
}

export function blogCoverAlt(title: string): string {
  return `Cover image for the blog article: ${title}`;
}

export function heroBackgroundAlt(): string {
  return "Soft purple and pink gradient background for Conalytic marketing analytics hero section";
}
