import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "About - adiveda-practice",
  description: "Learn more about adiveda-practice and our approach to modern web development.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section className="section-padding min-h-[60vh] flex items-center pt-32">
          <div className="padding-global w-full">
            <div className="container-xlarge">
              <div className="text-center ">
                <p className="eyebrow mb-4">About Us</p>
                <h1 className="heading-h1">About Us</h1>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
