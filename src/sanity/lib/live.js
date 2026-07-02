import {defineLive} from "next-sanity/live";
import {client} from "@/sanity/client";

const token = process.env.SANITY_API_READ_TOKEN || false;

export const {sanityFetch, SanityLive} = defineLive({
  client,
  browserToken: token,
  serverToken: token,
});
