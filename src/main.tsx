import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@shopify/polaris/build/esm/styles.css';
// Import i18n setup so translations are initialized
import './i18n';
import './global.d.ts';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <div
      style={{
        fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
        lineHeight: 1.5,
        fontWeight: 400,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        margin: 0,
        minWidth: 320,
        minHeight: '100vh',
      }}
    >
      <App />
    </div>
  );
}
