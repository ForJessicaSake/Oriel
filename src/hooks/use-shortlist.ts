"use client";

import { useSyncExternalStore } from "react";

const KEY = "oriel-shortlist";
const EVENT = "oriel-shortlist-change";
const EMPTY: string[] = [];

let cache = "";
let ids: string[] = EMPTY;

function snapshot() {
  const raw = localStorage.getItem(KEY) ?? "[]";
  if (raw !== cache) {
    cache = raw;
    try {
      const parsed: unknown = JSON.parse(raw);
      ids = Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === "string")
        : EMPTY;
    } catch {
      ids = EMPTY;
    }
  }
  return ids;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function toggleShortlist(id: string) {
  const current = snapshot();
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  cache = "";
  window.dispatchEvent(new Event(EVENT));
}

export function useShortlist() {
  const held = useSyncExternalStore(subscribe, snapshot, () => EMPTY);

  return {
    ids: held,
    count: held.length,
    has: (id: string) => held.includes(id),
    toggle: toggleShortlist,
  };
}
