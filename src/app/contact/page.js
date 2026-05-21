import Navbar from "@/components/layout/Navbar";
import ContactForm from "@/components/sections/ContactForm";

export const metadata = {
  title: "Contact - Next.js Starter",
  description: "Get in touch with us. We'd love to hear about your project.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section className="section-padding min-h-[60vh] flex items-center pt-32">
          <div className="padding-global w-full">
            <div className="container-xlarge">
              <div className="max-w-4xl">
                <p className="eyebrow mb-4">Contact</p>
                <h1 className="heading-h1">Get In Touch</h1>
                <p className="text-body mt-6 max-w-2xl text-lg">
                  Have a project in mind or want to discuss a potential collaboration? 
                  Reach out to us and let's create something amazing together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT FORM SECTION */}
        <section className="section-padding bg-secondary">
          <div className="padding-global w-full">
            <div className="container-xlarge">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16">
                {/* Left Column - Info */}
                <div className="flex flex-col justify-center gap-10 rounded-[2rem] border border-white/80 bg-white p-10 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                  <div>
                    <h2 className="heading-h3 mb-4">Let's Talk</h2>
                    <p className="text-base text-gray-600 max-w-xl">
                      Share a few details and we’ll follow up with the next steps for your project.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <p className="eyebrow mb-3 text-gray-600">Email</p>
                      <a
                        href="mailto:contact@nextjs-starter.com"
                        className="text-lg font-semibold hover:text-primary transition-colors"
                      >
                        contact@nextjs-starter.com
                      </a>
                    </div>

                    {/* Phone */}
                    <div>
                      <p className="eyebrow mb-2 text-gray-600">Phone</p>
                      <a
                        href="tel:+1234567890"
                        className="text-lg font-semibold hover:text-primary transition-colors"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>

                    {/* Location */}
                    <div>
                      <p className="eyebrow mb-2 text-gray-600">Location</p>
                      <p className="text-lg font-semibold">
                        San Francisco, CA
                      </p>
                    </div>

                    {/* Social Links */}
                    <div>
                      <p className="eyebrow mb-4 text-gray-600">Follow Us</p>
                      <div className="flex gap-4">
                        {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((social) => (
                          <a
                            key={social}
                            href="#"
                            className="inline-flex items-center justify-center w-10 h-10 border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-sm font-semibold"
                          >
                            {social[0]}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Form */}
                <div className="rounded-[2rem] border border-white/80 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="section-padding">
          <div className="padding-global w-full">
            <div className="container-xlarge max-w-2xl">
              <h2 className="heading-h2 mb-12">Frequently Asked Questions</h2>

              <div className="space-y-6">
                {[
                  {
                    question: "What's your typical project timeline?",
                    answer:
                      "Project timelines vary based on scope and complexity. Most projects range from 4-12 weeks. We'll provide a detailed timeline during our initial consultation.",
                  },
                  {
                    question: "Do you work with existing codebases?",
                    answer:
                      "Yes! We can refactor, optimize, and enhance existing codebases. We'll conduct a thorough code review to understand your current setup.",
                  },
                  {
                    question: "What's your support process after launch?",
                    answer:
                      "We offer flexible support packages including bug fixes, feature updates, and performance optimization. We can discuss ongoing support during our initial meeting.",
                  },
                  {
                    question: "How do you handle project communication?",
                    answer:
                      "We believe in transparent communication. We provide regular updates, hold weekly sync meetings, and use project management tools to keep everyone aligned.",
                  },
                ].map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex cursor-pointer items-center justify-between bg-secondary p-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                      {faq.question}
                      <span className="transform transition group-open:rotate-180">↓</span>
                    </summary>
                    <p className="mt-4 px-6 pb-4 text-gray-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
