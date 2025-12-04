import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Polaris
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

// i18next
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // you’ll create a simple config file

// Tailwind global styles
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider i18n={{}}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </AppProvider>
  </React.StrictMode>
);
