import React from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import "./index.css";

import { FaqWidget } from "./features/faq/components/FaqWidget/FaqWidget";

const faqs = [
  {
    question: "How do I enable the App Embed?",
    answer: (
      <div>
        <p>
          To make your Upsell offers appear on your storefront, you need to enable the App Embed in your Shopify theme. This takes just a minute.
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>Go to Shopify admin → Online Store → Customize</li>
          <li>Open the App embeds tab</li>
          <li>Find Libautech Smart Upsell and toggle it on</li>
          <li>(Optional) If your theme supports app blocks, drag our block into the Product template</li>
          <li>Click Save to make it live</li>
        </ul>
        <p className="mt-2">
          <a
            href="#"
            className="underline text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Full guide: How to Enable App Embed
          </a>
        </p>
      </div>
    ),
  },
  {
    question: "My offer isn’t showing up — what should I do?",
    answer: <p>Make sure the App Embed is enabled and your offer conditions are met. Check targeting rules and product availability.</p>,
  },
  {
    question: "How do I reposition the widget?",
    answer: <p>Use the theme editor to drag and drop the widget block into your desired location.</p>,
  },
  {
    question: "How do I edit an existing offer?",
    answer: <p>Go to the Offers tab in the app dashboard, click the offer, and edit its settings.</p>,
  },
  {
    question: "Can I use the app with theme builders like PageFly or GemPages?",
    answer: <p>Yes, it works with PageFly, GemPages, and Shogun. You may need to manually insert the embed block.</p>,
  },
  {
    question: "What is meant by order limits in the plan page?",
    answer: <p>Order limits refer to the number of upsell-triggered orders allowed per billing cycle.</p>,
  },
];

export function App() {
  return (
    <AppProvider i18n={{}}>
      <div className="w-full max-w-[720px] mx-auto px-4 py-8">
        {/* Heading block */}
        <div className="mb-6">
          <h1 className="text-[28px] font-semibold leading-tight text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-[16px] text-gray-500 mt-1">
            Quick answers to common questions
          </p>
        </div>

        {/* FAQ widget */}
        <div className="space-y-4">
          <FaqWidget faqs={faqs} />
        </div>
      </div>
    </AppProvider>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
