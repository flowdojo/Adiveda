import { watch } from "fs";
import { exec } from "child_process";
import { join } from "path";

const schemaDir = join(process.cwd(), "src/sanity/schemaTypes");

console.log("Watching schema types for changes...");

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

watch(schemaDir, { recursive: true }, (event, filename) => {
  if (!filename) return;

  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log(`Schema changed (${filename}), regenerating types...`);
    exec(
      "npm run sanity:typegen",
      { cwd: process.cwd() },
      (error, stdout, stderr) => {
        if (error) {
          console.error("Typegen failed:", stderr);
        } else {
          console.log("Types regenerated successfully.");
        }
      }
    );
  }, 500);
});
