"use client";

import { useState } from "react";
import ButtonA from "@/components/ui/ButtonA";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your message! We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="rounded-[1.75rem] border border-gray-200 bg-white p-8 shadow-sm space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2 tracking-[0.02em] text-gray-900">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-primary focus:ring-4 focus:ring-primary/15 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2 tracking-[0.02em] text-gray-900">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-primary focus:ring-4 focus:ring-primary/15 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-semibold mb-2 tracking-[0.02em] text-gray-900">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Project Inquiry"
            className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-primary focus:ring-4 focus:ring-primary/15 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-2 tracking-[0.02em] text-gray-900">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            placeholder="Tell us about your project..."
            className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-primary focus:ring-4 focus:ring-primary/15 focus:outline-none resize-none min-h-[180px]"
          />
        </div>

        {submitStatus && (
          <div
            className={`p-4 rounded-2xl text-sm font-medium ${
              submitStatus.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <ButtonA
          type="submit"
          text={isLoading ? "Sending..." : "Send Message"}
          className="w-full max-w-xs rounded-full py-4 text-base font-semibold disabled:opacity-50"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}
