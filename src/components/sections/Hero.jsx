import ButtonA from "@/components/ui/ButtonA";

export default function Hero() {
  return (
    <section className="section-padding min-h-screen flex items-center">
      <div className="padding-global w-full">
        <div className="container-xlarge">
          <div className="max-w-4xl flex flex-col items-start gap-16">
            <div>
            <p fd-animate="fade-up" className="eyebrow mb-4">
              Style Guide
            </p>

            <h1 fd-animate="fade-up" className="heading-h1">
              Flowdojo Style Guide
            </h1>
            </div>

            <div fd-animate="fade-up" className="mt-10 flex flex-wrap gap-4">
              <ButtonA href="#" text="Get Started" />

              <ButtonA href="#" text="Learn More" variant="secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
