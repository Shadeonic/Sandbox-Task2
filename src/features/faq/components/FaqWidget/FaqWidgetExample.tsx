import { FaqWidget } from "./FaqWidget";

export const FaqWidgetExample = () => {
  const faqs = [
    { question: "How do I enable the App Embed?", answer: <p>Go to Shopify admin → Online Store → Themes → Customize → App Embeds.</p> },
    { question: "My offer isn’t showing up?", answer: <p>Check if App Embed is enabled and your offer is active.</p> },
  ];

  return <FaqWidget faqs={faqs} />;
};
