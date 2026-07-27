import { Suspense } from "react";
import { StudioPage } from "@/components/admin/studio/StudioPage";

export default function AdminStudioRoute() {
  return (
    <Suspense fallback={null}>
      <StudioPage />
    </Suspense>
  );
}
