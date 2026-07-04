import {createClient} from "next-sanity";

import {apiVersion, dataset, projectId,} from "./env";

function filterStegaStrings({sourcePath, filterDefault, ...props}) {
  const path = sourcePath.map((part) => String(part));

  if (path.includes("href") || path.includes("slug")) {
    return false;
  }

  return filterDefault({sourcePath, filterDefault, ...props});
}

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      stega: {
        studioUrl: "/studio",
        filter: filterStegaStrings,
      },
    })
  : null;
