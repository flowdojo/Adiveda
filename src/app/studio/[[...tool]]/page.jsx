import {projectId} from "@/sanity/env";
import StudioLoader from "./StudioLoader";

export const dynamic = "force-static";

export default function StudioPage() {
  if (!projectId) {
    return (
      <main className="min-h-screen bg-background px-6 py-20 text-foreground">
        <div className="mx-auto max-w-2xl space-y-4">
          <h1 className="font-heading text-4xl">Sanity is almost ready</h1>
          <p>
            Add your Sanity project values to <code>.env.local</code>, then restart the dev server.
          </p>
          <pre className="overflow-x-auto rounded bg-white p-4 text-sm text-foreground">
            NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id{"\n"}
            NEXT_PUBLIC_SANITY_DATASET=production{"\n"}
            NEXT_PUBLIC_SANITY_API_VERSION=2026-05-22
          </pre>
        </div>
      </main>
    );
  }

  return <StudioLoader />;
}
