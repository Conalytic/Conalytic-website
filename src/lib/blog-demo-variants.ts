/** Topic-specific animated demos for SEO blog articles. */
export type BlogDemoVariant =
  | "ga4-traffic-drop"
  | "ask-ga4"
  | "ai-traffic-ga4"
  | "ads-ga4-discrepancy"
  | "report-structure"
  | "html-pdf-dashboard"
  | "cross-channel"
  | "ai-reports"
  | "kpi-targets"
  | "kpi-status";

export type BlogCluster = "chat" | "reports" | "kpis";

export function clusterToProductVisual(cluster: BlogCluster): "chat" | "kpis" | "reports" {
  if (cluster === "kpis") return "kpis";
  if (cluster === "reports") return "reports";
  return "chat";
}

export function categoryToCluster(category: string): BlogCluster {
  if (category.toLowerCase().includes("kpi")) return "kpis";
  if (category.toLowerCase().includes("report")) return "reports";
  return "chat";
}
