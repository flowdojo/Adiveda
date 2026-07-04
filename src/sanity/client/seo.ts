import { MetaTagType, SeoType } from "@/types/seo";
import { Metadata } from "next";
import { resolveOpenGraphImage } from "./utils";
import { getBaseUrl } from "@/utils/get-base-url";

function parseAdditionalMetaTags(
  additionalMetaTags: MetaTagType[] | undefined,
) {
  if (!additionalMetaTags) {
    return undefined;
  }

  const otherTags: Record<string, string> = {};
  additionalMetaTags.forEach((metaTag) => {
    metaTag?.metaAttributes?.forEach((metaAttribute) => {
      if (metaAttribute?.attributeKey) {
        if (
          metaAttribute?.attributeType === "string" &&
          metaAttribute?.attributeValueString
        ) {
          otherTags[metaAttribute.attributeKey] =
            metaAttribute.attributeValueString;
        }

        if (
          metaAttribute?.attributeType === "image" &&
          metaAttribute?.attributeValueImage?.asset?.url
        ) {
          otherTags[metaAttribute.attributeKey] =
            metaAttribute.attributeValueImage.asset.url;
        }
      }
    });
  });

  return otherTags;
}

export const formatMetaData = ({
  seo,
  defaultTitle,
  pageUrl,
  publishedTime,
  modifiedTime,
  type = "website",
}: {
  seo: SeoType;
  defaultTitle: string;
  pageUrl: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: "website" | "article";
}): Metadata => {
  const metaImage = resolveOpenGraphImage(seo.metaImage);
  const baseUrl = getBaseUrl();

  return {
    title: seo?.metaTitle ?? defaultTitle,
    description: seo?.metaDescription,
    keywords: seo?.seoKeywords,
    robots: seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: seo?.openGraph
      ? {
          title: seo.openGraph.title || seo.metaTitle || undefined,
          description:
            seo.openGraph.description || seo.metaDescription || undefined,
          siteName: seo.openGraph.siteName || "Success Tutoring Franchise",
          images: seo.openGraph.image
            ? resolveOpenGraphImage(seo.openGraph.image)
            : metaImage,
          type: type,
          url: pageUrl,
          publishedTime: publishedTime || undefined,
          modifiedTime: modifiedTime || undefined,
        }
      : undefined,
    twitter: seo?.twitter
      ? {
          site: seo.twitter.site || undefined,
          description:
            seo.openGraph?.description || seo.metaDescription || undefined,
          title: seo.openGraph?.title || seo.metaTitle || undefined,
          images: metaImage,
        }
      : undefined,
    other: parseAdditionalMetaTags(seo?.additionalMetaTags),
  };
};
