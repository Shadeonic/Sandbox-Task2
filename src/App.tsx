import { FaqWidget } from "./features/faq/components/FaqWidget/FaqWidget";

const faqs = [
  {
    question: "How do I enable the App Embed?",
    answer: (
      <ul>
        <li>Go to Shopify admin → Online Store → Customize</li>
        <li>Open the App embeds tab</li>
        <li>Toggle on Libautech Smart Upsell</li>
        <li>Click Save to make it live</li>
      </ul>
    ),
  },
  {
    question: "Can I use the app with PageFly?",
    answer: (
      <p>
        Yes, it works with PageFly, GemPages, and Shogun.{" "}
        <a
          href="https://libautech.crisp.help/en/article/can-i-use-the-app-with-theme-builders-pagefly-gempages-shogun-1yczadx/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600"
        >
          Learn more
        </a>
      </p>
    ),
  },
];

function App() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <FaqWidget faqs={faqs} />
    </div>
  );
}

export default App;
