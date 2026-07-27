import { CmsPreviewRenderer } from "@/components/admin/CmsPreviewRenderer";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ registryId?: string; chrome?: string }>;
};

export default async function AdminPreviewFramePage({ searchParams }: Props) {
  const params = await searchParams;
  const chrome = params.chrome === "header" || params.chrome === "footer" ? params.chrome : undefined;
  return <CmsPreviewRenderer registryId={params.registryId} chrome={chrome} />;
}
