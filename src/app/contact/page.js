import Navbar from "@/components/layout/Navbar";
import Eyebrow from "@/components/ui/Eyebrow";
import FaqSection from "@/components/ui/FaqSection";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { getContactPage } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";

function ContactIcon({ type }) {
  const iconClass = "h-4 w-4 shrink-0 text-black";

  const icons = {
    email: (
      <svg aria-hidden="true" className={iconClass} fill="none" viewBox="0 0 16 16">
        <path
          d="M13.333 2.667H2.667c-.734 0-1.334.6-1.334 1.333v8c0 .733.6 1.333 1.334 1.333h10.666c.734 0 1.334-.6 1.334-1.333V4c0-.733-.6-1.333-1.334-1.333Zm-.266 2.832L8.707 8.226a1.33 1.33 0 0 1-1.414 0L2.933 5.5a.57.57 0 0 1-.172-.15.6.6 0 0 1 .802-.81L8 7.333l4.467-2.794a.6.6 0 0 1 .8.81.57.57 0 0 1-.2.15Z"
          fill="currentColor"
        />
      </svg>
    ),
    phone: (
      <svg aria-hidden="true" className={iconClass} fill="none" viewBox="0 0 16 16">
        <path
          clipRule="evenodd"
          d="M11.035 14.755c-.96-.035-3.681-.411-6.53-3.26-2.849-2.849-3.224-5.57-3.26-6.53-.054-1.464 1.068-2.886 2.363-3.441a1 1 0 0 1 .963.106c1.067.777 1.803 1.953 2.435 2.878a1 1 0 0 1-.171 1.324l-1.3.966a.33.33 0 0 0-.095.41c.295.536.819 1.333 1.419 1.933.6.6 1.435 1.159 2.008 1.487a.33.33 0 0 0 .429-.108l.847-1.289a1 1 0 0 1 1.37-.221c.938.65 2.033 1.373 2.834 2.399.225.29.273.68.126 1.09-.558 1.301-1.97 2.31-3.438 2.256Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    ),
    map: (
      <svg aria-hidden="true" className={iconClass} fill="none" viewBox="0 0 16 16">
        <path
          d="M8 1.333A5.333 5.333 0 0 0 2.667 6.667C2.667 10.667 8 14.667 8 14.667s5.333-4 5.333-8A5.333 5.333 0 0 0 8 1.333Zm0 7.334A2 2 0 1 1 8 4.667a2 2 0 0 1 0 4Z"
          fill="currentColor"
        />
      </svg>
    ),
  };

  return (
    <div className="rounded-full text-black bg-black/10 p-3">
      {icons[type] || icons.map}
    </div>
  );
}

export async function generateMetadata() {
  const contactPage = await getContactPage();

  return {
    title: contactPage?.seo?.title || "Contact - Adiveda",
    description:
      contactPage?.seo?.description ||
      "Get in touch with Adiveda.",
  };
}

export default async function ContactPage() {
  const contactPage = (await getContactPage()) || {};
  const email = contactPage?.email || "hello@adiveda.com";
  const phone = contactPage?.phone || "+91 98765 43210";
  const address = contactPage?.address || "Mumbai, Maharashtra, India";
  const testimonial = contactPage?.testimonial || {};
  const faqSection = contactPage?.faqSection || {};
  const faqItems = contactPage?.faqItems || [];
  const testimonialImageUrl =
    urlForImage(testimonial.image)?.width(160).height(160).url() ||
    "/images/contact-hero-testimonial-author.png";
  const contactLinks = [
    { href: `mailto:${email}`, icon: "email", label: email },
    { href: `tel:${phone.replaceAll(" ", "")}`, icon: "phone", label: phone },
    { icon: "map", label: address, className: "col-span-2" },
  ];


  return (
    <>
      <Navbar />
      <main>
        <section className="bg-brand-bg-beige pt-28 pb-16 md:pt-36 md:pb-18 lg:pt-40">
          <div className="padding-global">
            <div className="container-xlarge">
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
                <div className="flex h-full w-full flex-col justify-between gap-6">
                  <div className="max-w-102 space-y-4">
                    <Eyebrow className="mb-1.5">{contactPage?.eyebrow || "Reach Out"}</Eyebrow>
                    <h1 className="heading-h3">{contactPage?.title || "We Are Listening"}</h1>
                    <p className="text-body text-black/60">
                      {contactPage?.subtitle || "We respond to every message within 24 hours. No bots, no templates - a real conversation with someone who has walked this path."}
                    </p>
                    <a href="#faq" className="inline-flex text-sm font-semibold text-black underline underline-offset-4">
                      Jump to FAQs
                    </a>
                  </div>

                  <div className="mt-2 md:mt-6">
                    <TestimonialCard
                      quote={testimonial.quote || "We built this because we needed it ourselves. The practices in Hridhayam are not teachings we read about; they are the ones that changed our lives."}
                      author={testimonial.author || "Massimo Vignelli"}
                      role={testimonial.role || "Founders, Adiveda · Hridhayam"}
                      image={testimonialImageUrl}
                      theme="base"
                    />
                  </div>
                </div>
                <div className="contact-form-wrap w-full rounded-2xl bg-white p-5 shadow-sm md:p-6">
                  <div className="flex flex-col gap-3">
                    <h1 className="heading-h5 max-w-60 leading-[0.95]">{contactPage?.formTitle || "What Brings You Here Today?"}</h1>
                    <p className="text-body text-black/60">
                      {contactPage?.formSubtitle || "Choose what feels closest — we'll make the rest simple."}
                    </p>
                  </div>
                  <div className="h-px w-full bg-black/20"></div>
                  <form className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4 ">
                      <label className="grid gap-1.5 text-sm">
                        <div className="text-base">Name</div>
                        <input
                          className="input-field"
                          name="name"
                          type="text"
                          placeholder="Your Full Name"
                        />
                      </label>
                      <label className="grid gap-1.5 text-sm">
                        <div className="text-base">Email</div>
                        <input
                          className="input-field"
                          name="email"
                          type="email"
                          placeholder="Your Email Address"
                        />
                      </label>
                    </div>

                    <label className="grid gap-1.5 text-sm">
                      <div className="text-base">I am looking for</div>
                      <input
                        className="input-field"
                        name="Looking For"
                        type="text"
                        placeholder="A daily Sadhana practice"
                      />
                    </label>

                    <label className="grid gap-1.5 text-sm">
                      <div className="text-base">Preferred Language</div>
                      <input
                        className="input-field"
                        name="Preferred Language"
                        type="text"
                        placeholder="Hindi"
                      />
                    </label>

                    <label className="grid gap-1.5 text-sm">
                      <div className="text-base">Preferred Language</div>
                      <input
                        className="input-field"
                        name="Preferred Language"
                        type="text"
                        placeholder="Hindi"
                      />
                    </label>

                    <label className="grid gap-2 text-sm">
                      Write to us
                      <textarea
                        className="input-field"
                        name="message"
                        placeholder="You"
                      />
                    </label>
                    <button
                      className="button-primary justify-self-start"
                      type="submit"
                    >
                      Request My Call
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FaqSection
          id="faq"
          eyebrow={faqSection.eyebrow || "FAQ"}
          title={faqSection.title || "Helpful answers before you reach out"}
          description={faqSection.description || "Everything you need to know about the process, timing, and what comes next after your message."}
          items={faqItems}
          defaultOpenIndex={0}
        />
      </main>
    </>
  );
}
