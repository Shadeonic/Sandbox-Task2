# FaqWidget

The `FaqWidget` component displays a list of frequently asked questions in a collapsible format.  
It uses Shopify Polaris components for layout and styling, with Tailwind classes for hover and rotation effects.

---

## Props

### `faqs` (required)
- **Type:** `FaqItem[]`
- **Shape:**
  ```ts
  interface FaqItem {
    question: string;
    answer: React.ReactNode;
  }
  ```
Description: An array of FAQ items. Each item contains a question string and an answer React node (can be text, lists, links, etc.).

---

##Behavior
-Renders all FAQ questions in a vertical list.
-Clicking a question toggles its answer open/closed.
-Only one FAQ can be open at a time.
-Chevron icon rotates when the item is expanded.
-Optional analytics/event tracking can be added by extending the click handler.

---

##Example Usage
```tsx
import { FaqWidget } from "./FaqWidget";

const faqs = [
  {
    question: "How do I enable the App Embed?",
    answer: (
      <ul>
        <li>Go to Shopify admin → Online Store → Customize</li>
        <li>Open the App embeds tab</li>
        <li>Toggle on Smart Upsell</li>
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

export function App() {
  return <FaqWidget faqs={faqs} />;
}
``` 
##Testing Notes
-Use Vitest + React Testing Library.
-Verify that all questions render.
-Clicking toggles answer visibility.
-Only one FAQ open at a time.
-Chevron rotates when expanded.