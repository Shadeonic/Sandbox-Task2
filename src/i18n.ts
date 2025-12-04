import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "faq.title": "FAQ",
        "faq.subtitle": "Quick answers to common questions",
        "faq.question1": "How do I enable the App Embed?",
        "faq.answer1": "Go to Shopify admin → Online Store → Themes → Customize → App Embeds.",
        "faq.question2": "My offer isn’t showing up?",
        "faq.answer2": "Check if App Embed is enabled and your offer is active.",
      },
    },
    lv: {
      translation: {
        "faq.title": "BUJ",
        "faq.subtitle": "Ātras atbildes uz biežākajiem jautājumiem",
        "faq.question1": "Kā ieslēgt App Embed?",
        "faq.answer1": "Ej uz Shopify admin → Online Store → Themes → Customize → App Embeds.",
        "faq.question2": "Mana piedāvājuma nav redzams?",
        "faq.answer2": "Pārbaudi, vai App Embed ir ieslēgts un piedāvājums aktīvs.",
      },
    },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
