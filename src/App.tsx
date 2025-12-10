import React from 'react';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import './index.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
} from 'react-router-dom';
import { FaqWidgetExample } from '@/features/faq/components/FaqWidget/FaqWidgetExample';
import { ComponentDetailsPage } from '@/sandbox/pages/ComponentDetailsPage';
import Page from '@/pages/Page';

export function App() {
  return (
    <AppProvider i18n={{}}>
      <BrowserRouter>
        <main className="flex h-screen">
          {/* Sidebar navigation */}
          <nav className="w-64 border-r p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/components/faq-widget"
                  className="text-blue-600 hover:underline"
                >
                  FAQ Widget
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-blue-600 hover:underline">
                  Offers Table
                </Link>
              </li>
            </ul>
          </nav>

          {/* Main content area */}
          <section className="flex-1 p-6 overflow-y-auto">
            <Routes>
              {/* Default redirect goes to the FAQ docs/demo page */}
              <Route
                path="/"
                element={<Navigate to="/components/faq-widget" replace />}
              />

              {/* FAQ demo route */}
              <Route path="/faq" element={<FaqWidgetExample />} />

              {/* Offers table route */}
              <Route path="/offers" element={<Page />} />

              {/* Component details route for docs integration */}
              <Route
                path="/components/:componentId"
                element={<ComponentRouteWrapper />}
              />
            </Routes>
          </section>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}

/**
 * Wrapper to extract :componentId param and render ComponentDetailsPage
 */
function ComponentRouteWrapper() {
  const { componentId } = useParams();
  if (!componentId) return <div>No component selected.</div>;
  return <ComponentDetailsPage componentId={componentId} />;
}
