import Navbar from "@/components/layout/Navbar";
import BlogListing from "@/components/blog/BlogListing";
import Eyebrow from "@/components/ui/Eyebrow";
import {sampleBlogs} from "@/lib/sampleBlogs";
import {getBlogPage, getBlogPosts} from "@/sanity/queries";
import {urlForImage} from "@/sanity/image";

export const dynamic = "force-dynamic";

function withImageUrls(post) {
  return {
    ...post,
    coverImageUrl: urlForImage(post.coverImage)?.width(1200).height(750).url() || null,
  };
}

export async function generateMetadata() {
  const blogPage = await getBlogPage();

  return {
    title: blogPage?.seo?.title || "Blog - adiveda-practice",
    description:
      blogPage?.seo?.description ||
      "Notes on Ayurveda, ritual, Panchang, and grounded practice.",
  };
}

export default async function BlogPage() {
  const blogPage = await getBlogPage();
  const sanityPosts = await getBlogPosts();
  const posts = (sanityPosts.length ? sanityPosts : sampleBlogs).map(withImageUrls);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="section-padding pt-40">
          <div className="padding-global">
            <div className="container-xlarge space-y-12">
              <div className="max-w-3xl space-y-5">
                <Eyebrow className="text-primary">{blogPage?.eyebrow || "Journal"}</Eyebrow>
                <h1 className="heading-h1">{blogPage?.title || "Blog"}</h1>
                <p className="text-body text-foreground/75">
                  {blogPage?.subtitle || "Notes on Ayurveda, ritual, Panchang, and grounded practice."}
                </p>
              </div>

              <BlogListing posts={posts} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
