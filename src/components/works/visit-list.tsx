"use client";

import Link from "next/link";

import { works } from "@/data/works";
import { useShortlist } from "@/hooks/use-shortlist";
import { workHref } from "@/constants/routes";

export function VisitList() {
  const { ids, toggle } = useShortlist();
  const held = works.filter((work) => ids.includes(work.slug));

  if (held.length === 0) {
    return (
      <p className="max-w-md text-ink-soft">
        Nothing held yet. Mark a work as you look, and it will wait here for the visit.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-line border-y border-line">
      {held.map((work) => (
        <li key={work.slug} className="flex items-baseline justify-between gap-6 py-4">
          <div>
            <Link href={workHref(work.slug)} className="serif text-[28px] leading-none">
              {work.title}
            </Link>
            <p className="mt-2 text-[13px] text-ink-soft">
              <a href={work.creditUrl} className="hover:text-clay" target="_blank" rel="noreferrer">
                {work.artist}
              </a>
              {" · "}
              {work.medium}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggle(work.slug)}
            className="text-[11px] tracking-[0.16em] text-faint uppercase hover:text-clay"
          >
            Release
          </button>
        </li>
      ))}
    </ul>
  );
}
