"use client";

import { useMemo, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { WorkRow } from "@/components/works/work-row";
import { mediumFilters, works } from "@/data/works";
import type { MediumGroup } from "@/types/work";
import { classNames } from "@/utils/class-names";

type FilterId = "all" | MediumGroup;

export function WorksIndex() {
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = useMemo(
    () => (filter === "all" ? works : works.filter((work) => work.group === filter)),
    [filter],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by medium">
        {mediumFilters.map((item) => {
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.id)}
              className={classNames(
                "border px-3 py-1.5 text-[11px] tracking-[0.16em] uppercase transition-colors duration-300",
                active
                  ? "border-clay text-clay"
                  : "border-line text-faint hover:border-ink-soft hover:text-ink",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div key={filter}>
        {visible.map((work, index) => (
          <Reveal key={work.slug} index={index}>
            <WorkRow work={work} index={works.indexOf(work)} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-ink-soft">Nothing in this medium is on the wall.</p>
      ) : null}
    </div>
  );
}
