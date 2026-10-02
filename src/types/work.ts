export type MediumGroup = "oil" | "acrylic" | "paper" | "mixed";

export type Work = {
  slug: string;
  title: string;
  artist: string;
  creditUrl: string;
  year: number;
  medium: string;
  group: MediumGroup;
  dimensions: string;
  image: string;
  note: string;
  story: string;
};

export type StoryBeat = {
  kicker: string;
  text: string;
};

export type Exhibition = {
  slug: string;
  title: string;
  dates: string;
  place: string;
  status: "now" | "earlier";
  statement: string;
  image: string;
  credit: string;
  creditUrl: string;
  workSlugs: string[];
  beats: StoryBeat[];
};
