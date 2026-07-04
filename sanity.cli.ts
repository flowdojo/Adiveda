/**
 * Sanity CLI Configuration
 * This file configures the Sanity CLI tool with project-specific settings
 * and customizes the Vite bundler configuration.
 * Learn more: https://www.sanity.io/docs/cli
 */

import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  mediaLibrary: {
    aspectsPath: "aspects",
  },
  autoUpdates: true,
  typegen: {
    schema: "./.sanity/schema.json",
    generates: "./.sanity/sanity.types.ts",
    path: "**/*.{ts,tsx}",
  },
});
