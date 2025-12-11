import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from './Page';

const renderWithPolaris = (ui: React.ReactElement) =>
  render(<AppProvider i18n={enTranslations}>{ui}</AppProvider>);

describe('Page component', () => {
  it('renders the table with mock offers', async () => {
    renderWithPolaris(<Page />);
    expect(await screen.findByText(/Volume discount #3/i)).toBeInTheDocument();
    expect(screen.getByText(/Product addons #2/i)).toBeInTheDocument();
  });

  it('filters offers when search is used', async () => {
    renderWithPolaris(<Page />);
    const searchInput = screen.getByPlaceholderText(/search/i);

    fireEvent.change(searchInput, { target: { value: 'Cart drawer' } });

    await waitFor(() => {
      expect(screen.getByText(/Cart drawer addons #2/i)).toBeInTheDocument();
      expect(screen.queryByText(/Volume discount #3/i)).not.toBeInTheDocument();
    });
  });

  it('shows no results message when search yields nothing', async () => {
    renderWithPolaris(<Page />);
    const searchInput = screen.getByPlaceholderText(/search/i);

    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    await waitFor(() => {
      expect(screen.getByText(/no offers found/i)).toBeInTheDocument();
    });
  });
});
