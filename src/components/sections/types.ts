import { GetPageQueryResult } from "@/sanity.types";

export type Sections = NonNullable<GetPageQueryResult>["pageSections"];
export type Section = NonNullable<Sections>[number];
export type HeroSection = Omit<Extract<Section, { _type: "hero" }>, "_key"> & {
  _key?: string;
};
