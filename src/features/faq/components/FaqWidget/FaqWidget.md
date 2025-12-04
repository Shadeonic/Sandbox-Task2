# FaqWidget

A collapsible FAQ component built with Shopify Polaris and Tailwind CSS.  
Displays a list of questions that expand to reveal answers, with smooth transitions and chevron indicators.

---

## Props

### `faqs: FaqItem[]`  
An array of FAQ items passed as a prop. Each item includes:
- `question: string` — The question text.
- `answer: React.ReactNode` — The answer content (can include text, lists, links, etc.).

---

## Example

```tsx
<FaqWidget
  faqs={[
    {
      question: "How do I enable the App Embed?",
      answer: (
        <ul>
          <li>Go to Shopify admin → Online Store → Customize</li>
          <li>Open the App embeds tab</li>
          <li>Toggle on Libautech Smart Upsell</li>
          <li>(Optional) Drag the block into the Product template</li>
          <li>Click Save to make it live</li>
        </ul>
      ),
    },
    {
      question: "Can I use the app with PageFly?",
      answer: (
        <p>
          Yes, it works with PageFly, GemPages, and Shogun.  
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
  ]}
/>
