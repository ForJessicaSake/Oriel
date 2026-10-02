"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { ShortlistButton } from "@/components/works/shortlist-button";
import { exhibitionHref, workHref } from "@/constants/routes";
import { exhibition as currentShow, exhibitions, worksIn } from "@/data/works";
import { classNames } from "@/utils/class-names";

export function ExhibitionRoom({ initialSlug }: { initialSlug?: string }) {
  const router = useRouter();
  const selected =
    exhibitions.find((show) => show.slug === initialSlug) ?? currentShow;
  const room = worksIn(selected.slug);

  function choose(slug: string) {
    router.push(exhibitionHref(slug), { scroll: false });
  }

  return (
    <div className="px-5 pt-28 pb-20 sm:px-8">
      <p className="eyebrow mb-4">{exhibitions.length} rooms</p>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Exhibitions">
        {exhibitions.map((show) => {
          const active = show.slug === selected.slug;
          return (
            <button
              key={show.slug}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => choose(show.slug)}
              className={classNames(
                "border px-4 py-2 text-left transition-colors duration-300",
                active ? "border-clay text-ink" : "border-line text-ink-soft hover:border-ink-soft",
              )}
            >
              <span className="block text-[10px] tracking-[0.16em] uppercase">
                {show.status === "now" ? "On now" : "Earlier"}
              </span>
              <span className="serif mt-1 block text-[22px] leading-none">{show.title}</span>
            </button>
          );
        })}
      </div>

      <div key={selected.slug} className="room-swap">
        <div className="mt-12 grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-4">{selected.dates}</p>
            <h1 className="serif text-[64px] leading-[0.9] tracking-tight sm:text-[88px]">
              {selected.title}
            </h1>
            <p className="mt-8 max-w-[46ch] text-[17px] leading-relaxed text-ink-soft">
              {selected.statement}
            </p>
          </div>
          <div>
            <div className="frame image-reveal relative aspect-4/5 sm:aspect-5/4">
              <Image
                src={selected.image}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-[12px] text-faint">
              Photograph by{" "}
              <a
                href={selected.creditUrl}
                className="text-ink-soft underline decoration-line underline-offset-4 hover:text-clay"
                target="_blank"
                rel="noreferrer"
              >
                {selected.credit}
              </a>
            </p>
          </div>
        </div>

        <section className="mt-20" aria-labelledby="story-heading">
          <h2 id="story-heading" className="eyebrow">
            The story of the room
          </h2>
          <ol className="mt-8 grid gap-10 md:grid-cols-3">
            {selected.beats.map((beat, index) => (
              <li key={beat.kicker}>
                <Reveal index={index}>
                  <p className="serif text-[42px] leading-none text-clay/80">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="serif mt-3 text-[28px] leading-none">{beat.kicker}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{beat.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20" aria-labelledby="wall-heading">
          <h2 id="wall-heading" className="serif text-[40px] leading-none">
            On the wall
          </h2>
          <p className="mt-4 max-w-[42ch] text-[14px] text-ink-soft">
            Scroll the pictures. Stay on one and it comes toward you.
          </p>
          <ol className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2">
            {room.map((work, index) => (
              <li key={work.slug}>
                <Reveal index={index % 2}>
                  <Link href={workHref(work.slug)} className="shot-link group block">
                    <div className="frame shot relative aspect-4/5 overflow-hidden">
                      <Image
                        src={work.image}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <Link href={workHref(work.slug)}>
                      <p className="text-[12px] tracking-[0.14em] text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="work-title serif mt-1 text-[28px] leading-none">{work.title}</h3>
                      <p className="mt-2 text-[13px] text-ink-soft">{work.artist}</p>
                    </Link>
                    <ShortlistButton id={work.slug} label={work.title} />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
