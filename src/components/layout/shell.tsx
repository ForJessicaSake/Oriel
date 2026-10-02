"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { exhibition } from "@/data/works";
import { ROUTES, screenFromPathname } from "@/constants/routes";
import { useShortlist } from "@/hooks/use-shortlist";
import { classNames } from "@/utils/class-names";

const LINKS = [
  { href: ROUTES.exhibition, id: "exhibition", label: "Exhibition" },
  { href: ROUTES.works, id: "works", label: "Works" },
  { href: ROUTES.visit, id: "visit", label: "Visit" },
] as const;

function HoldMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M4 2.5h8v11L8 10.5 4 13.5v-11z" />
    </svg>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const screen = screenFromPathname(pathname);
  const { count } = useShortlist();
  const arrival = screen === "arrival";

  return (
    <div className="min-h-screen">
      <header
        className={classNames(
          "fixed inset-x-0 top-0 z-40 px-5 py-4 sm:px-8 sm:py-5",
          arrival ? "bg-canvas/55 text-white backdrop-blur-md" : "bg-canvas/80 text-ink backdrop-blur-md",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href={ROUTES.arrival} className="serif text-[22px] tracking-tight">
            Oriel
          </Link>

          <nav className="hidden items-center gap-8 sm:flex" aria-label="Gallery">
            {LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={classNames(
                  "nav-link text-[12px] tracking-[0.14em] uppercase",
                  screen === link.id ? "is-active" : "opacity-70",
                )}
                aria-current={screen === link.id ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href={ROUTES.visit}
            aria-label={`Shortlist, ${count} held`}
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase opacity-80"
          >
            <HoldMark />
            <span className="hidden sm:inline">Shortlist</span>
            <span key={count} className="count-pop text-clay">
              {count}
            </span>
          </Link>
        </div>

        <nav className="mt-3 flex items-center gap-5 sm:hidden" aria-label="Gallery">
          {LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={classNames(
                "nav-link text-[11px] tracking-[0.14em] uppercase",
                screen === link.id ? "is-active" : "opacity-70",
              )}
              aria-current={screen === link.id ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <main>{children}</main>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-8 text-[12px] tracking-[0.12em] text-faint uppercase sm:px-8">
          <span>{exhibition.title}</span>
          <a
            href="https://unsplash.com/license"
            className="normal-case tracking-normal hover:text-ink-soft"
          >
            Photographs via Unsplash
          </a>
          <span>{exhibition.dates}</span>
        </footer>
    </div>
  );
}
