"use client";

import Image from "next/image";
import Link from "next/link";
import {useMemo, useState} from "react";

import Eyebrow from "@/components/ui/Eyebrow";

function formatDate(date) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogListing({posts}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const values = posts.map((post) => post.category).filter(Boolean);
    return ["All", ...Array.from(new Set(values))];
  }, [posts]);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-5 py-2 text-sm transition-colors ${
              activeCategory === category
                ? "border-primary bg-primary text-black"
                : "border-primary/30 text-primary hover:bg-primary hover:text-primary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-lg border border-primary/15 bg-white transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-[2/1] bg-background-secondary">
              {post.coverImageUrl ? (
                <Image
                  src={post.coverImageUrl}
                  alt={post.coverImageAlt || post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-primary text-white">
                  <Eyebrow as="span">{post.category}</Eyebrow>
                </div>
              )}
            </div>

            <div className="space-y-4 p-6">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-primary">
                <span>{post.category}</span>
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <h2 className="heading-h5 text-foreground">{post.title}</h2>
              <p className="text-body text-foreground/75">{post.excerpt}</p>
              <p className="text-sm font-medium text-primary">Read article</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
