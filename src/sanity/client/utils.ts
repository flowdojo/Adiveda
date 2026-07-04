import { createImageUrlBuilder } from "@sanity/image-url";
import { clientEnv } from "@/env/clientEnv";

import { createDataAttribute } from "next-sanity";
import type { CreateDataAttributeProps } from "next-sanity";
import { SlugValidationContext } from "sanity";
import { CustomImageType } from "@/types/seo";

const imageBuilder = createImageUrlBuilder({
  projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
});

export const urlForImage = (source: { asset?: { _ref?: string } }) => {
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};

export function resolveOpenGraphImage(
  image: CustomImageType | undefined,
  width = 1200,
  height = 627,
) {
  if (!image) return;
  const url = imageBuilder
    .image(image)
    ?.width(width)
    .height(height)
    .fit("crop")
    .url();
  if (!url) return;
  return { url, width, height };
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, "id" | "type" | "path">>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
    baseUrl: clientEnv.NEXT_PUBLIC_SANITY_STUDIO_URL,
  })
    .combine(config)
    .toString();
}

export async function isUniqueOtherThanLanguage(
  slug: string,
  context: SlugValidationContext,
) {
  const { document, getClient } = context;
  if (!document?.language) {
    return true;
  }
  const client = getClient({ apiVersion: "2025-02-19" });
  const id = document._id.replace(/^drafts\./, "");
  const params = {
    id,
    language: document.language,
    slug,
  };
  const query = `!defined(*[
    !(sanity::versionOf($id)) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`;
  const result = await client.fetch(query, params);
  return result;
}
