import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Eyebrow from "@/components/ui/Eyebrow";
import {findSampleBlog, getSampleRelatedBlogs} from "@/lib/sampleBlogs";
import {getBlogPost, getRelatedBlogPosts} from "@/sanity/queries";
import {urlForImage} from "@/sanity/image";

export const dynamic = "force-dynamic";

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

function getBlockText(block) {
  return block?.children?.map((child) => child.text).join("") || "";
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getTocItems(blocks) {
  if (!blocks?.length) {
    return [];
  }

  return blocks
    .map((block, index) => {
      const text = getBlockText(block);

      if (!text || !["h2", "h3"].includes(block.style)) {
        return null;
      }

      return {
        id: slugify(text) || `section-${index}`,
        level: block.style,
        title: text,
      };
    })
    .filter(Boolean);
}

function AuthorAvatar({author}) {
  const imageUrl = urlForImage(author?.image)?.width(160).height(160).url();
  const initials =
    author?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2) || "A";

  return (
    <div className="relative h-14 w-14 overflow-hidden rounded-full bg-primary text-white">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={author.imageAlt || author.name}
          fill
          className="object-cover"
          sizes="56px"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-medium">
          {initials}
        </div>
      )}
    </div>
  );
}

function TableOfContents({items}) {
  if (!items.length) {
    return null;
  }

  return (
    <aside className="rounded-lg border border-primary/15 bg-white p-5">
      <Eyebrow className="text-primary">Contents</Eyebrow>
      <nav className="mt-5 space-y-3">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm leading-relaxed text-foreground/70 transition hover:text-primary ${
              item.level === "h3" ? "pl-4" : ""
            }`}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function BlogBody({blocks, tocItems}) {
  if (!blocks?.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const text = getBlockText(block);
        const tocItem = tocItems.find((item) => item.title === text);

        if (!text) {
          return null;
        }

        if (block.style === "h2") {
          return (
            <h2
              key={block._key || index}
              id={tocItem?.id}
              className="heading-h4 scroll-mt-28 pt-6"
            >
              {text}
            </h2>
          );
        }

        if (block.style === "h3") {
          return (
            <h3
              key={block._key || index}
              id={tocItem?.id}
              className="heading-h5 scroll-mt-28 pt-4"
            >
              {text}
            </h3>
          );
        }

        return (
          <p key={block._key || index} className="text-body text-foreground/80">
            {text}
          </p>
        );
      })}
    </div>
  );
}

function RelatedBlogs({posts}) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="section-padding bg-background-secondary">
      <div className="padding-global">
        <div className="container-xlarge space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow className="text-primary">Read Next</Eyebrow>
              <h2 className="heading-h4">Related Blogs</h2>
            </div>
            <Link href="/blog" className="text-sm font-medium text-primary">
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-lg border border-primary/15 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Eyebrow className="text-primary">{post.category}</Eyebrow>
                <h3 className="heading-h5 mt-4">{post.title}</h3>
                <p className="text-body mt-3 text-foreground/75">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({params}) {
  const {slug} = await params;
  const post = (await getBlogPost(slug)) || findSampleBlog(slug);

  if (!post) {
    return {
      title: "Blog",
    };
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
  };
}

export default async function BlogPostPage({params}) {
  const {slug} = await params;
  const post = (await getBlogPost(slug)) || findSampleBlog(slug);

  if (!post) {
    notFound();
  }

  const coverImageUrl = urlForImage(post.coverImage)?.width(1800).height(1000).url();
  const sanityRelated = await getRelatedBlogPosts({
    slug: post.slug,
    category: post.category,
  });
  const relatedPosts = sanityRelated.length
    ? sanityRelated
    : getSampleRelatedBlogs(post.slug, post.category);
  const tocItems = getTocItems(post.body);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <article>
          <section className="section-padding pt-40">
            <div className="padding-global">
              <div className="container-xlarge">
                <div className="mx-auto max-w-4xl space-y-8 text-center">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-widest text-primary">
                    <span>{post.category}</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <h1 className="heading-h1">{post.title}</h1>
                  <p className="text-body mx-auto max-w-2xl text-foreground/75">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-left">
                    <AuthorAvatar author={post.author} />
                    <div>
                      <p className="text-sm font-medium">{post.author?.name}</p>
                      {post.author?.bio ? (
                        <p className="text-sm text-foreground/60">{post.author.bio}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="relative mt-14 aspect-[16/9] overflow-hidden rounded-lg bg-background-secondary">
                  {coverImageUrl ? (
                    <Image
                      src={coverImageUrl}
                      alt={post.coverImageAlt || post.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="100vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-primary text-white">
                      <Eyebrow as="span">{post.category}</Eyebrow>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="pb-28">
            <div className="padding-global">
              <div className="container-xlarge grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <TableOfContents items={tocItems} />
                </div>
                <div className="max-w-3xl">
                  <BlogBody blocks={post.body} tocItems={tocItems} />
                </div>
              </div>
            </div>
          </section>
        </article>

        <RelatedBlogs posts={relatedPosts} />
      </main>
    </>
  );
}
