export const sampleBlogs = [
  {
    title: "Building a Daily Ritual With Ayurveda",
    slug: "building-a-daily-ritual-with-ayurveda",
    excerpt:
      "A gentle guide to morning practices that bring rhythm, clarity, and steadiness into everyday life.",
    publishedAt: "2026-05-18T08:00:00.000Z",
    category: "Ayurveda",
    coverImageAlt: "Warm morning light on a simple ritual setting",
    author: {
      name: "Adiveda Editorial",
      imageAlt: "Adiveda Editorial",
      bio: "Notes from the Adiveda team on rooted wellbeing and inner practice.",
    },
    body: [
      {
        style: "normal",
        children: [
          {
            text: "Ayurveda begins with attention. A daily ritual does not need to be elaborate; it needs to be repeatable, kind, and suited to your present season of life.",
          },
        ],
      },
      {
        style: "h2",
        children: [
          {
            text: "Begin with rhythm",
          },
        ],
      },
      {
        style: "normal",
        children: [
          {
            text: "Wake, hydrate, breathe, move, and sit quietly before the day gathers speed. Even ten steady minutes can become a foundation.",
          },
        ],
      },
    ],
  },
  {
    title: "Reading the Panchang With More Ease",
    slug: "reading-the-panchang-with-more-ease",
    excerpt:
      "A simple way to understand tithi, nakshatra, and timing without turning the practice into something intimidating.",
    publishedAt: "2026-05-21T08:00:00.000Z",
    category: "Panchang",
    coverImageAlt: "Open calendar and handwritten notes",
    author: {
      name: "Meera Sharma",
      imageAlt: "Meera Sharma",
      bio: "Writer and practitioner exploring time, ritual, and traditional knowledge systems.",
    },
    body: [
      {
        style: "normal",
        children: [
          {
            text: "The Panchang can feel dense at first, but it becomes friendly when read as a daily weather report for time itself.",
          },
        ],
      },
      {
        style: "h2",
        children: [
          {
            text: "Look for the essentials",
          },
        ],
      },
      {
        style: "normal",
        children: [
          {
            text: "Start with the tithi, nakshatra, and the broad quality of the day. Over time, the details begin to form a pattern you can feel and use.",
          },
        ],
      },
    ],
  },
];

export function findSampleBlog(slug) {
  return sampleBlogs.find((blog) => blog.slug === slug) || null;
}

export function getSampleRelatedBlogs(slug, category) {
  return sampleBlogs
    .filter((blog) => blog.slug !== slug && (!category || blog.category === category))
    .slice(0, 3);
}
