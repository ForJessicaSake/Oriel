import Image from "next/image";
import Link from "next/link";

import { ShortlistButton } from "@/components/works/shortlist-button";
import { exhibitionHref, workHref } from "@/constants/routes";
import { exhibitionFor } from "@/data/works";
import type { Work } from "@/types/work";

export function WorkRow({ work, index }: { work: Work; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const show = exhibitionFor(work.slug);

  return (
    <article className="work-row grid grid-cols-[72px_1fr] items-center gap-4 border-b border-line py-4 sm:grid-cols-[96px_88px_1fr_auto] sm:gap-6 sm:py-5">
      <Link href={workHref(work.slug)} className="frame shot relative block h-[88px] sm:h-[104px]">
        <Image
          src={work.image}
          alt=""
          fill
          sizes="120px"
          className="object-cover"
        />
      </Link>
      <p className="hidden text-[12px] tracking-[0.16em] text-faint sm:block">{number}</p>
      <div className="min-w-0">
        <p className="text-[11px] tracking-[0.14em] text-faint uppercase sm:hidden">{number}</p>
        <Link href={workHref(work.slug)} className="work-title serif block text-[26px] leading-none tracking-tight sm:text-[32px]">
          {work.title}
        </Link>
        <p className="mt-2 text-[13px] text-ink-soft">
          <a href={work.creditUrl} className="hover:text-clay" target="_blank" rel="noreferrer">
            {work.artist}
          </a>
          <span className="text-faint"> · {work.year}</span>
          {show ? (
            <>
              <span className="text-faint"> · </span>
              <Link href={exhibitionHref(show.slug)} className="hover:text-clay">
                {show.title}
              </Link>
            </>
          ) : null}
        </p>
      </div>
      <ShortlistButton id={work.slug} label={work.title} />
    </article>
  );
}
