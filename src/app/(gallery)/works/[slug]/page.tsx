import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ShortlistButton } from "@/components/works/shortlist-button";
import { ROUTES, exhibitionHref, workHref } from "@/constants/routes";
import { exhibitionFor, getWork, works, worksIn } from "@/data/works";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Work" };
  return {
    title: work.title,
    description: `${work.title}, photograph by ${work.artist}, ${work.year}. ${work.medium}, ${work.dimensions}.`,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const show = exhibitionFor(work.slug);
  const room = show ? worksIn(show.slug) : [work];
  const index = room.findIndex((item) => item.slug === work.slug);
  const previous = room[index - 1];
  const next = room[index + 1];

  return (
    <div className="px-5 pt-28 pb-20 sm:px-8">
      <div className="grid items-start gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <div className="frame image-reveal relative aspect-4/5 bg-line sm:aspect-5/4">
          <Image
            src={work.image}
            alt={work.title}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="lg:sticky lg:top-28">
          <p className="eyebrow mb-4">
            {show ? (
              <Link href={exhibitionHref(show.slug)}>{show.title}</Link>
            ) : null}{" "}
            {String(index + 1).padStart(2, "0")} / {String(room.length).padStart(2, "0")}
          </p>
          <h1 className="serif text-[48px] leading-[0.92] tracking-tight sm:text-[64px]">
            {work.title}
          </h1>
          <p className="mt-4 text-[18px] text-ink-soft">
            Photograph by{" "}
            <a
              href={work.creditUrl}
              className="underline decoration-line underline-offset-4 hover:text-clay"
              target="_blank"
              rel="noreferrer"
            >
              {work.artist}
            </a>
          </p>
          <dl className="mt-8 space-y-3 text-[14px]">
            <div className="flex justify-between gap-6 border-b border-line pb-3">
              <dt className="text-faint">Year</dt>
              <dd>{work.year}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line pb-3">
              <dt className="text-faint">Medium</dt>
              <dd className="text-right">{work.medium}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line pb-3">
              <dt className="text-faint">Dimensions</dt>
              <dd>{work.dimensions}</dd>
            </div>
          </dl>
          <p className="mt-8 max-w-[36ch] leading-relaxed text-ink-soft">{work.note}</p>
          <div className="mt-10">
            <h2 className="eyebrow">The story</h2>
            <p className="mt-4 max-w-[42ch] text-[16px] leading-relaxed">{work.story}</p>
          </div>
          <div className="mt-8">
            <ShortlistButton id={work.slug} label={work.title} />
          </div>
        </div>
      </div>

      <nav className="mt-16 flex items-end justify-between gap-6 border-t border-line pt-6" aria-label="Works">
        {previous ? (
          <Link href={workHref(previous.slug)} className="group max-w-[40%]">
            <span className="text-[11px] tracking-[0.16em] text-faint uppercase">Previous</span>
            <span className="serif mt-2 block text-[22px] leading-none transition-transform duration-300 group-hover:-translate-x-1 sm:text-[28px]">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={workHref(next.slug)} className="group max-w-[40%] text-right">
            <span className="text-[11px] tracking-[0.16em] text-faint uppercase">Next</span>
            <span className="serif mt-2 block text-[22px] leading-none transition-transform duration-300 group-hover:translate-x-1 sm:text-[28px]">
              {next.title}
            </span>
          </Link>
        ) : (
          <Link href={ROUTES.works} className="text-[12px] tracking-[0.14em] text-ink-soft uppercase">
            Back to index
          </Link>
        )}
      </nav>
    </div>
  );
}
