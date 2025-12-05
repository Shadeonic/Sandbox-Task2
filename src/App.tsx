import React from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import "./index.css";

import { FaqWidgetExample } from "./features/faq/components/FaqWidget/FaqWidgetExample";

export function App() {
  return (
    <AppProvider i18n={{}}>
      <main className="w-full max-w-2xl mx-auto px-6 py-10">
        {/* FAQ widget only */}
        <section className="space-y-4">
          <FaqWidgetExample />
        </section>
      </main>
    </AppProvider>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
