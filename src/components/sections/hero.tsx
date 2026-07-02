import { HeroSection } from "./types";
import { urlForImage } from "@/sanity/client/utils";
import { Image as SanityImage } from "next-sanity/image";

type HeroProps = {
  section: HeroSection;
};

export default function Hero({ section }: HeroProps) {
  const { title, subtitle, image } = section;
  return (
    <section className="section-padding relative min-h-screen flex items-center overflow-hidden">
      <div className="padding-global relative z-10 w-full">
        <div className="container-xlarge">
          <div className="max-w-150 mx-auto flex flex-col items-center text-center text-white gap-16">
            <div className="flex flex-col items-center gap-6">
              <h1 fd-animate="heading-anime" className="text-h1">
                {title}
              </h1>
              <p fd-animate="heading-anime" className="text-base">
                {subtitle}
              </p>
            </div>

            <div
              fd-animate="child-fade-up"
              className="flex flex-wrap gap-4"
            ></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 ">
        <SanityImage
          src={urlForImage(image!)?.quality(100).url() as string}
          fill
          alt={image?.alt || ""}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
