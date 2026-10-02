"use client";

import { useEffect, useRef } from "react";

const HOVER = "a, button, [role='button'], input, select, textarea, .work-row";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || touch) {
      ring.hidden = true;
      dot.hidden = true;
      return;
    }

    document.body.classList.add("has-custom-cursor");

    let mouseX = -40;
    let mouseY = -40;
    let ringX = -40;
    let ringY = -40;
    let hovering = false;
    let frame = 0;

    const tick = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      const next =
        event.target instanceof Element && Boolean(event.target.closest(HOVER));
      if (next !== hovering) {
        hovering = next;
        ring.classList.toggle("is-hover", next);
      }
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
