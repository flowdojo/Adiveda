import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoType } from "@/types/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { getPageQuery } from "@/sanity/queries/queries";
import { formatMetaData } from "@/sanity/client/seo";
import PageSections from "@/components/sections/page-sections";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: {
      slug: slug,
    },
  });

  if (!page?.seo) {
    return {};
  }

  return formatMetaData({
    seo: page.seo as unknown as SeoType,
    defaultTitle: page?.name || "",
    pageUrl: `/${slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;

  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: {
      slug: slug,
      language: locale,
    },
  });

  if (!page) {
    notFound();
  }

  const { _id, _type, pageSections } = page;

  return (
    <PageSections
      documentId={_id}
      documentType={_type}
      sections={pageSections}
    />
  );
}
