import {createImageUrlBuilder} from "@sanity/image-url";

import {client} from "./client";

const builder = client ? createImageUrlBuilder(client) : null;

export function urlForImage(source) {
  return builder && source ? builder.image(source) : null;
}
