import React from 'react';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

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
import { EmbedStatus } from '@/features/status/EmbedStatus';

const mockAllBlocks = {
  ugc: {
    index: true,
    product: false,
    cart: false,
    collection: false,
    collectionList: false,
  },
};

// Error boundary to catch render issues
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="p-6 text-red-600">
          Error rendering component: {String(this.state.error)}
        </div>
      );
    }
    return this.props.children;
  }
}

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
              <li>
                <Link
                  to="/embed-status"
                  className="text-blue-600 hover:underline"
                >
                  Embed Status
                </Link>
              </li>
            </ul>
          </nav>

          {/* Main content area */}
          <section className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/components/faq-widget" replace />}
              />
              <Route path="/faq" element={<FaqWidgetExample />} />
              <Route path="/offers" element={<Page />} />
              <Route
                path="/embed-status"
                element={
                  <ErrorBoundary>
                    <EmbedStatus
                      allBlocks={mockAllBlocks}
                      themeStoreId="demo-theme-id"
                    />
                  </ErrorBoundary>
                }
              />
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

function ComponentRouteWrapper() {
  const { componentId } = useParams();
  if (!componentId) return <div>No component selected.</div>;
  return <ComponentDetailsPage componentId={componentId} />;
}
