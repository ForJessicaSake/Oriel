import type { CSSProperties } from "react";

export function Headline({
  lines,
  className,
}: {
  lines: Array<{ words: string[]; italic?: boolean }>;
  className?: string;
}) {
  return (
    <h1 className={className}>
      {lines.map((line, lineIndex) => {
        const start = lines
          .slice(0, lineIndex)
          .reduce((total, item) => total + item.words.length, 0);

        return (
          <span
            key={line.words.join("-")}
            className={line.italic ? "block italic text-clay" : "block"}
          >
            {line.words.map((word, wordIndex) => (
              <span key={`${word}-${wordIndex}`} className="hero-word-wrap">
                <span
                  className="hero-word-inner"
                  style={{ "--word-i": start + wordIndex } as CSSProperties}
                >
                  {word}
                </span>{" "}
              </span>
            ))}
          </span>
        );
      })}
    </h1>
  );
}
