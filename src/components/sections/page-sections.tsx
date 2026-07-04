"use client";

import { SanityDocument } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import { Section, Sections } from "./types";
import { dataAttr } from "@/sanity/client/utils";
import { ElementType } from "react";
import Hero from "./hero";
import CTA from "./cta";
import featuresSection from "./featuresSection";

type PageSectionstype = Section["_type"];

type PageSectionsProps = {
  documentId: string;
  documentType: string;
  sections?: Sections;
};

type PageData = SanityDocument<{
  pageSections?: Sections;
}>;

const SECTION_COMPONENTS: Record<PageSectionstype, ElementType> = {
  hero: Hero,
  cta: CTA,
  featuresSection: featuresSection,
} as const;

export default function PageSections({
  documentId,
  documentType,
  sections: initialSections = [],
}: PageSectionsProps) {
  const sections = useOptimistic<Sections, PageData>(
    initialSections ?? [],
    (currentSections, action) => {
      if (action.id !== documentId || !action?.document?.pageSections) {
        return currentSections;
      }

      return action.document.pageSections.map(
        (section) =>
          currentSections?.find(
            (currentSection) => currentSection._key === section?._key,
          ) || section,
      );
    },
  );

  if (!sections?.length) {
    return null;
  }

  return (
    <div
      data-sanity={dataAttr({
        id: documentId,
        type: documentType,
        path: "pageSections",
      })}
    >
      {sections?.map((section) => {
        const { _key, _type, ...sectionProps } = section;
        const SectionComponent = SECTION_COMPONENTS[_type];

        console.log({ SectionComponent });

        if (!SectionComponent) {
          return (
            <div
              key={_key}
              className="flex items-center justify-center p-8 my-8 text-center text-muted-foreground bg-muted rounded-lg"
            >
              Component not found for block type: <code>{_type}</code>
            </div>
          );
        }

        return (
          <div
            key={_key}
            data-sanity={dataAttr({
              id: documentId,
              type: documentType,
              path: `pageSections[_key=="${_key}"]`,
            })}
          >
            <SectionComponent section={sectionProps} />
          </div>
        );
      })}
    </div>
  );
}
