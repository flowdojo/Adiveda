import Navbar from "@/components/layout/Navbar";
import Eyebrow from "@/components/ui/Eyebrow";
import {getAboutPage} from "@/sanity/queries";

export async function generateMetadata() {
  const aboutPage = await getAboutPage();

  return {
    title: aboutPage?.seo?.title || "About - adiveda-practice",
    description:
      aboutPage?.seo?.description ||
      "Learn more about adiveda-practice and our approach to modern web development.",
  };
}

export default async function AboutPage() {
  const aboutPage = await getAboutPage();

  return (
    <>
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section className="section-padding min-h-[60vh] flex items-center pt-32">
          <div className="padding-global w-full">
            <div className="container-xlarge">
              <div className="text-center ">
                <Eyebrow className="mb-4">{aboutPage?.eyebrow || "About Us"}</Eyebrow>
                <h1 className="heading-h1">{aboutPage?.title || "About Us"}</h1>
                {aboutPage?.subtitle ? (
                  <p className="mx-auto mt-4 max-w-2xl text-body text-foreground/75">{aboutPage.subtitle}</p>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
