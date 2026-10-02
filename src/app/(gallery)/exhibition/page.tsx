import type { Metadata } from "next";

import { ExhibitionRoom } from "@/components/exhibition/room";
import { exhibition, getExhibition } from "@/data/works";

type ExhibitionPageProps = {
  searchParams: Promise<{ show?: string }>;
};

export async function generateMetadata({
  searchParams,
}: ExhibitionPageProps): Promise<Metadata> {
  const { show } = await searchParams;
  const selected = (show && getExhibition(show)) || exhibition;
  return {
    title: selected.title,
    description: selected.statement,
  };
}

export default async function ExhibitionPage({ searchParams }: ExhibitionPageProps) {
  const { show } = await searchParams;
  return <ExhibitionRoom initialSlug={show} />;
}
