import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// Import i18n setup so translations are initialized
import './i18n';
import './global.d.ts';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
