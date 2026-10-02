export const ROUTES = {
  arrival: "/",
  exhibition: "/exhibition",
  works: "/works",
  visit: "/visit",
} as const;

export function workHref(slug: string) {
  return `/works/${slug}`;
}

export function exhibitionHref(slug: string) {
  return `/exhibition?show=${slug}`;
}

export type GalleryScreen = "arrival" | "exhibition" | "works" | "visit";

export function screenFromPathname(pathname: string): GalleryScreen {
  if (pathname === ROUTES.exhibition || pathname.startsWith(`${ROUTES.exhibition}/`)) {
    return "exhibition";
  }
  if (pathname === ROUTES.works || pathname.startsWith(`${ROUTES.works}/`)) {
    return "works";
  }
  if (pathname === ROUTES.visit || pathname.startsWith(`${ROUTES.visit}/`)) {
    return "visit";
  }
  return "arrival";
}
