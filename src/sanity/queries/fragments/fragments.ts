import { defineQuery } from "next-sanity";

export const imageFragment = /* groq */ `
  _type,
  crop {
    _type,
    right,
    top,
    left,
    bottom
  },
  hotspot {
    _type,
    x,
    y,
    height,
    width,
  },
  asset->{...},
`;

export const linkFragment = /* groq */ `
  _type,
  type,
  openInNewTab,
  external,
  href,
  internal->{
    _type,
    _id,
    "slug": slug.current,
    "category": categories[0]-> slug.current
  }
`;

export const buttonFragment = /* groq */ `
  _key,
  _type,
  variant,
  withoutBackground,
  text,
  icon,
  hoverIcon,
  link {
    ${linkFragment}
  }
`;

/**
 * SEO
 */

export const openGraphFragment = /* groq */ `
   _type,
   siteName,
   url,
   description,
   title,
   "image": image -> image {
     ${imageFragment}
   },
 `;

export const metaAttributesFragment = /* groq */ `
   _type,
   attributeValueString,
   attributeType,
   attributeKey,
   attributeValueImage {
     ${imageFragment}
   },
 `;

export const additionalMetaTagFragment = /* groq */ `
   _key,
   _type,
   metaAttributes[] {
     ${metaAttributesFragment}
   },
 `;

export const twitterFragment = /* groq */ `
  _type,
  site,
  creator,
  cardType,
  handle,
`;

export const seoFragment = /* groq */ `
...,
  _type,
  metaTitle,
  noIndex,
  seoKeywords,
  metaDescription,
  "metaImage": metaImage -> image {
    ${imageFragment}
  },

  additionalMetaTags[]{
    ${additionalMetaTagFragment}
  },
  openGraph {
    ${openGraphFragment}
  },
  twitter {
    ${twitterFragment}
  }
`;

export const buttonsFragment = /* groq */ `
  buttons[]{
    ${buttonFragment}
  }
`;

export const singleButtonFragment = /* groq */ `
  _type,
  variant,
   withoutBackground,
  text,
  icon,
  hoverIcon,
  link {
    ${linkFragment}
  }
`;

export const heroSectionFragment = /* groq */ `
  _type,
  title,
  subtitle,
  "image": imageAsset -> image,
  ${buttonsFragment}
`;

export const ctaSectionFragment = /* groq */ `
  _type,
`;


export const featuresSectionFragment = /* groq */ `
  _type,
  heading,
  description,
  ${buttonFragment},
  featureCards[] {
    _key,
    title,
    description,
    "image" : image -> image {
      ${imageFragment}
    },
  }
`;

export const pageBuilderFragment = /* groq */ `
  pageSections[]{
    ...,
    _key,
    _type,
    _type == 'hero' => {${heroSectionFragment}},
    _type == 'cta' => {${ctaSectionFragment}},
    _type == 'featuresSection' => {${featuresSectionFragment}}
  },
`;

export const pageFragment = /* groq */ `
  _createdAt,
  _updatedAt,
  date,
  ${pageBuilderFragment}
  seo {
    ${seoFragment}
  },
`;

