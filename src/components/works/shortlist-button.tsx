"use client";

import { useShortlist } from "@/hooks/use-shortlist";
import { classNames } from "@/utils/class-names";

export function ShortlistButton({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const { has, toggle } = useShortlist();
  const held = has(id);

  return (
    <button
      type="button"
      aria-pressed={held}
      onClick={() => toggle(id)}
      className={classNames(
        "inline-flex items-center gap-2 border px-3 py-2 text-[11px] tracking-[0.16em] uppercase transition-colors duration-300",
        held
          ? "border-clay bg-clay text-canvas"
          : "border-line text-ink-soft hover:border-clay hover:text-ink",
      )}
    >
      <span
        className={classNames(
          "inline-block size-1.5 rounded-full transition-transform duration-300",
          held ? "scale-100 bg-canvas" : "scale-75 bg-clay",
        )}
        aria-hidden="true"
      />
      {held ? "Held" : "Hold"}
      <span className="sr-only"> {label}</span>
    </button>
  );
}
