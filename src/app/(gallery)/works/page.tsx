import type { Metadata } from "next";

import { WorksIndex } from "@/components/works/works-index";

export const metadata: Metadata = {
  title: "Works",
  description: "Every work in the rooms, with title, photographer, year, and a shortlist.",
};

export default function WorksPage() {
  return (
    <div className="px-5 pt-28 pb-20 sm:px-8">
      <p className="eyebrow mb-4">Index</p>
      <h1 className="serif max-w-[12ch] text-[56px] leading-[0.92] tracking-tight sm:text-[76px]">
        The works
      </h1>
      <p className="mt-6 mb-12 max-w-[42ch] text-ink-soft">
        Hold a work to keep it for your visit. The list stays in this browser.
      </p>
      <WorksIndex />
    </div>
  );
}
