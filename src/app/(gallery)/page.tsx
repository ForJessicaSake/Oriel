import Image from "next/image";
import Link from "next/link";

import { Headline } from "@/components/motion/headline";
import { Reveal } from "@/components/motion/reveal";
import { exhibitionHref, ROUTES, workHref } from "@/constants/routes";
import { exhibition, exhibitions, worksIn } from "@/data/works";

const HOURS = [
  ["Thursday", "12–6"],
  ["Friday", "12–6"],
  ["Saturday", "11–6"],
  ["Sunday", "11–5"],
];

const REASONS = [
  {
    title: "A room, not a shop",
    text: "Nothing here is for sale. You look, you stay on a picture, and you leave when you have had enough. The shortlist is for the visit, not a checkout.",
  },
  {
    title: "A list that waits",
    text: "Hold a work while you scroll. It stays in this browser, under Shortlist, so you can walk in and ask for the ones you already chose.",
  },
  {
    title: "Rooms that stay open",
    text: "Earlier exhibitions do not disappear. Heat Index, Night Room, First Light, and Market Cloth are still on the site, with the pictures that were on the wall.",
  },
  {
    title: "Four quiet days",
    text: "Thursday to Sunday, in Ikoyi. The building is closed at the start of the week, which is how the rooms stay uncrowded enough to stand in.",
  },
];

export default function ArrivalPage() {
  const onTheWall = worksIn(exhibition.slug).slice(0, 8);
  const earlier = exhibitions.filter((show) => show.status === "earlier");

  return (
    <>
      <section className="relative min-h-screen">
        <div className="frame image-reveal absolute inset-0">
          <Image
            src={exhibition.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-still object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-canvas via-canvas/25 to-canvas" />
        </div>

        <div className="relative flex min-h-screen flex-col justify-end px-5 pt-32 pb-16 sm:px-8 sm:pb-20">
          <p className="eyebrow delay-in mb-6" style={{ animationDelay: "80ms" }}>
            {exhibition.place} · {exhibition.dates}
          </p>
          <Headline
            className="serif max-w-[18ch] text-[56px] leading-[0.92] tracking-tight sm:max-w-none sm:text-[88px]"
            lines={[
              { words: ["Still", "water."] },
              { words: ["A", "room", "for", "looking."], italic: true },
            ]}
          />
          <p
            className="delay-in mt-8 max-w-[36ch] text-[16px] leading-relaxed text-ink"
            style={{ animationDelay: "900ms" }}
          >
            The current room, the earlier ones, and a few works to start with.
          </p>
          <p className="delay-in mt-4 text-[12px] text-white/70" style={{ animationDelay: "980ms" }}>
            Photograph by{" "}
            <a
              href={exhibition.creditUrl}
              className="underline decoration-white/30 underline-offset-4 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              {exhibition.credit}
            </a>
          </p>
          <div className="delay-in mt-8" style={{ animationDelay: "1080ms" }}>
            <Link
              href={ROUTES.exhibition}
              className="inline-flex bg-ink px-5 py-3 text-[12px] tracking-[0.16em] text-canvas uppercase transition-colors duration-300 hover:bg-clay"
            >
              Enter the exhibition
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8" aria-labelledby="reasons-heading">
        <p className="eyebrow mb-4">Why come</p>
        <h2 id="reasons-heading" className="serif max-w-[14ch] text-[44px] leading-none sm:text-[64px]">
          What the visit gives you.
        </h2>
        <ol className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {REASONS.map((reason, index) => (
            <li key={reason.title} className="border-t border-line pt-6">
              <Reveal index={index % 2}>
                <p className="text-[12px] tracking-[0.16em] text-faint">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="serif mt-3 text-[32px] leading-none">{reason.title}</h3>
                <p className="mt-4 max-w-[42ch] text-ink-soft">{reason.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line px-5 py-20 sm:px-8" aria-labelledby="earlier-heading">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Past rooms</p>
            <h2 id="earlier-heading" className="serif max-w-[12ch] text-[44px] leading-none sm:text-[64px]">
              Already on the wall.
            </h2>
          </div>
          <Link
            href={ROUTES.exhibition}
            className="hidden text-[12px] tracking-[0.14em] text-ink-soft uppercase hover:text-clay sm:inline"
          >
            All rooms
          </Link>
        </div>
        <ol className="space-y-20">
          {earlier.map((show, index) => {
            const pictures = worksIn(show.slug).slice(0, 3);
            return (
              <li key={show.slug}>
                <Reveal index={index % 2}>
                  <article className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
                    <Link href={exhibitionHref(show.slug)} className="shot-link group block">
                      <div className="frame shot relative aspect-4/5 overflow-hidden sm:aspect-5/4">
                        <Image
                          src={show.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="lg:pt-4">
                      <p className="text-[12px] tracking-[0.16em] text-clay uppercase">
                        Earlier · {show.dates}
                      </p>
                      <h3 className="serif mt-3 text-[40px] leading-none sm:text-[52px]">
                        <Link href={exhibitionHref(show.slug)} className="work-title">
                          {show.title}
                        </Link>
                      </h3>
                      <p className="mt-6 max-w-[38ch] text-ink-soft">{show.statement}</p>
                      <p className="mt-4 text-[12px] text-faint">
                        Photograph by{" "}
                        <a
                          href={show.creditUrl}
                          className="text-ink-soft underline decoration-line underline-offset-4 hover:text-clay"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {show.credit}
                        </a>
                      </p>
                      <ul className="mt-8 grid grid-cols-3 gap-3">
                        {pictures.map((work) => (
                          <li key={work.slug}>
                            <Link href={workHref(work.slug)} className="shot-link group block">
                              <div className="frame shot relative aspect-square overflow-hidden">
                                <Image
                                  src={work.image}
                                  alt=""
                                  fill
                                  sizes="160px"
                                  className="object-cover"
                                />
                              </div>
                              <span className="mt-2 block text-[12px] leading-snug text-ink-soft">
                                {work.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="px-5 pb-20 sm:px-8" aria-labelledby="wall-heading">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">From the current room</p>
            <h2 id="wall-heading" className="serif text-[44px] leading-none sm:text-[64px]">
              On the wall.
            </h2>
          </div>
          <Link
            href={ROUTES.works}
            className="hidden text-[12px] tracking-[0.14em] text-ink-soft uppercase hover:text-clay sm:inline"
          >
            All works
          </Link>
        </div>
        <ol className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {onTheWall.map((work, index) => (
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
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="work-title serif text-[28px] leading-none">{work.title}</h3>
                      <p className="mt-2 text-[13px] text-ink-soft">{work.artist}</p>
                    </div>
                    <span className="text-[12px] tracking-[0.14em] text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line px-5 py-20 sm:px-8" aria-labelledby="visit-heading">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Visit</p>
            <h2 id="visit-heading" className="serif max-w-[12ch] text-[44px] leading-[0.95] sm:text-[64px]">
              Come and stand with it.
            </h2>
            <p className="mt-6 max-w-[36ch] text-ink-soft">
              House 4, Oriel Court, Ikoyi. Closed Monday to Wednesday.
            </p>
            <Link
              href={ROUTES.visit}
              className="mt-8 inline-flex border border-line px-5 py-3 text-[12px] tracking-[0.16em] uppercase transition-colors duration-300 hover:border-clay hover:text-clay"
            >
              Plan a visit
            </Link>
          </div>
          <dl className="w-full max-w-sm justify-self-end self-end">
            {HOURS.map(([day, hours]) => (
              <div key={day} className="flex items-baseline justify-between gap-8 border-b border-line py-3 text-[15px]">
                <dt className="shrink-0">{day}</dt>
                <dd className="shrink-0 text-ink-soft">{hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
