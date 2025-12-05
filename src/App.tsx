import React from "react";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import "./index.css";

import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { FaqWidgetExample } from "./features/faq/components/FaqWidget/FaqWidgetExample";
// placeholder import for Upsell — create this file when you expand
// import { UpsellWidgetExample } from "./features/upsell/components/UpsellWidgetExample";

export function App() {
  return (
    <AppProvider i18n={{}}>
      <BrowserRouter>
        <main className="flex h-screen">
          {/* Sidebar navigation */}
          <nav className="w-64 border-r p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-blue-600 hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/upsell" className="text-blue-600 hover:underline">
                  Upsell
                </Link>
              </li>
              {/* add more links here */}
            </ul>
          </nav>

          {/* Main content area */}
          <section className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/faq" replace />} />
              <Route path="/faq" element={<FaqWidgetExample />} />
              {/* Uncomment when UpsellWidgetExample exists */}
              {/* <Route path="/upsell" element={<UpsellWidgetExample />} /> */}
            </Routes>
          </section>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}
