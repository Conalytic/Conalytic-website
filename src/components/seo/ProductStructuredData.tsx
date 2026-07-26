import { JsonLd } from "@/components/seo/JsonLd";
import type { ProductId } from "@/lib/products";
import { getProduct } from "@/lib/products";
import { productSoftwareSchema, webPageSchema } from "@/lib/structured-data";

/** Product route JSON-LD: WebPage + dedicated SoftwareApplication. */
export function ProductStructuredData({ productId }: { productId: ProductId }) {
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
    </>
  );
}
