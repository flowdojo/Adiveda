import PageSections from "@/components/sections/page-sections";
import { getHomePage } from "@/sanity/queries";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const homePage = await getHomePage();

  if (!homePage) {
    notFound();
  }

  const { _id, _type, pageSections } = homePage;

  console.log({ pageSections });

  return (
    <>
      <PageSections
        sections={pageSections}
        documentId={_id}
        documentType={_type}
      />
    </>
  );
}
