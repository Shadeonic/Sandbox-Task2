import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { componentsList } from "../data/componentsList";

type ComponentDetailsPageProps = {
  componentId: string; // e.g., "faq-widget"
};

export function ComponentDetailsPage({ componentId }: ComponentDetailsPageProps) {
  const item = useMemo(
    () => componentsList.find((c) => c.id === componentId),
    [componentId]
  );

  if (!item) {
    return <div>Component not found.</div>;
  }

  const Example = item.example; // <-- use the example component
  const componentMd = item.docs?.component ?? "";
  const overviewMd = item.docs?.overview ?? "";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Live example</h2>
        <div className="rounded border p-4">
          <Example /> {/* <-- render the actual demo */}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Documentation</h2>

        {overviewMd && (
          <article className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{overviewMd}</ReactMarkdown>
          </article>
        )}

        {componentMd && (
          <article className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{componentMd}</ReactMarkdown>
          </article>
        )}
      </section>
    </div>
  );
}
