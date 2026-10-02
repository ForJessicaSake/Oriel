import type { Metadata } from "next";

import { VisitList } from "@/components/works/visit-list";
import { exhibition } from "@/data/works";

export const metadata: Metadata = {
  title: "Visit",
  description: "Hours and address for Oriel, and the works you held for the visit.",
};

const HOURS = [
  ["Thursday", "12–6"],
  ["Friday", "12–6"],
  ["Saturday", "11–6"],
  ["Sunday", "11–5"],
];

export default function VisitPage() {
  return (
    <div className="px-5 pt-28 pb-20 sm:px-8">
      <p className="eyebrow mb-4">Visit</p>
      <h1 className="serif max-w-[10ch] text-[56px] leading-[0.92] tracking-tight sm:text-[80px]">
        Come and stand with it.
      </h1>

      <div className="mt-14 grid gap-16 lg:grid-cols-2">
        <section>
          <h2 className="text-[12px] tracking-[0.16em] text-faint uppercase">Hours</h2>
          <dl className="mt-4 max-w-sm">
            {HOURS.map(([day, hours]) => (
              <div key={day} className="flex items-baseline justify-between gap-8 border-b border-line py-3 text-[15px]">
                <dt className="shrink-0">{day}</dt>
                <dd className="shrink-0 text-ink-soft">{hours}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[13px] text-faint">Closed Monday to Wednesday.</p>

          <h2 className="mt-12 text-[12px] tracking-[0.16em] text-faint uppercase">Address</h2>
          <p className="serif mt-4 text-[32px] leading-none">House 4, Oriel Court</p>
          <p className="mt-3 text-ink-soft">Ikoyi, Lagos</p>
          <p className="mt-6 max-w-[36ch] text-[14px] leading-relaxed text-ink-soft">
            {exhibition.title} is on the ground floor. Ask for the shortlist at the desk — the names are enough.
          </p>
        </section>

        <section id="shortlist">
          <h2 className="text-[12px] tracking-[0.16em] text-faint uppercase">Your shortlist</h2>
          <div className="mt-6">
            <VisitList />
          </div>
        </section>
      </div>
    </div>
  );
}
