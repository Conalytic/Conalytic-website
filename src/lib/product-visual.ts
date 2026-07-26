export type ProductVisualVariant = "chat" | "kpis" | "reports";

export function categoryToProductVisual(category: string): ProductVisualVariant {
  if (category.toLowerCase().includes("kpi")) return "kpis";
  if (category.toLowerCase().includes("report")) return "reports";
  return "chat";
}
