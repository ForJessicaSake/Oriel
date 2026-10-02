import { Cursor } from "@/components/layout/cursor";
import { Shell } from "@/components/layout/shell";

export default function GalleryLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Cursor />
      <Shell>{children}</Shell>
    </>
  );
}
