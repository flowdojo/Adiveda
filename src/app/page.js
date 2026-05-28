import Navbar from "@/components/layout/Navbar";
import ButtonA from "@/components/ui/ButtonA";
import Image from "next/image";
import {getHomePage} from "@/sanity/queries";
import {urlForImage} from "@/sanity/image";

export const dynamic = "force-dynamic";

const fallbackHomePage = {
  heroTitle: "For a Rooted in Bharat. Open to the World of Being",
  heroSubtitle: "Rooted in the timeless wisdom of Bharat, the pathway to inner evolution.",
  primaryCta: {
    label: "Get Started",
    href: "#",
  },
  secondaryCta: {
    label: "Learn More",
    href: "#",
  },
  heroImageAlt: "Hero Background",
};

export default async function HomePage() {
  const homePage = (await getHomePage()) || fallbackHomePage;
  const heroImageUrl = urlForImage(homePage.heroImage)?.width(2400).height(1400).url();

  return (
    <>
      <Navbar />
      <main>
         <section className="section-padding relative min-h-screen flex items-center overflow-hidden">
              <div className="padding-global relative z-10 w-full">
                <div className="container-xlarge">
                  <div className="max-w-[565px] mx-auto flex flex-col items-center text-center text-white gap-16">
                    <div className="flex flex-col items-center gap-6">
                      <h1  className="heading-h1">
                        {homePage.heroTitle}
                      </h1>
                        <p fd-animate="heading-anime" className="text-base">
                        {homePage.heroSubtitle}
                      </p>
                    </div>
        
                    <div fd-animate="child-fade-up" className="flex flex-wrap gap-4">
                      <ButtonA
                        href={homePage.secondaryCta?.href || "#"}
                        text={homePage.secondaryCta?.label || "Learn More"}
                        variant="secondary"
                      />
                      <ButtonA
                        href={homePage.primaryCta?.href || "#"}
                        text={homePage.primaryCta?.label || "Get Started"}
                      />
        
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0">
                <Image
                  src={heroImageUrl || "/images/home-hero-bg.png"}
                  alt={homePage.heroImageAlt || "Hero Background"}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </section>
      </main>
    </>
  );
}
