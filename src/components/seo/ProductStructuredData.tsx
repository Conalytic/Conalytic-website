import { JsonLd } from "@/components/seo/JsonLd";
import type { ProductId } from "@/lib/products";
import { getProduct } from "@/lib/products";
import type { MarketingFaqItem } from "@/lib/marketing-faqs";
import {
  breadcrumbListSchema,
  faqPageSchema,
  productSoftwareSchema,
  webPageSchema,
} from "@/lib/structured-data";

/** Product route JSON-LD: WebPage + SoftwareApplication + optional FAQPage. */
export function ProductStructuredData({
  productId,
  faqItems = [],
}: {
  productId: ProductId;
  faqItems?: MarketingFaqItem[];
}) {
  const product = getProduct(productId);

  return (
    <>
      <JsonLd
        id={`ld-product-webpage-${productId}`}
        data={webPageSchema(product.path, product.metaTitle, product.metaDescription)}
      />
      <JsonLd
        id={`ld-product-software-${productId}`}
        data={productSoftwareSchema(product)}
      />
      {faqItems.length > 0 ? (
        <JsonLd id={`ld-product-faq-${productId}`} data={faqPageSchema(faqItems)} />
      ) : null}
      <JsonLd
        id={`ld-product-breadcrumbs-${productId}`}
        data={breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: product.name, path: product.path },
        ])}
      />
    </>
  );
}
