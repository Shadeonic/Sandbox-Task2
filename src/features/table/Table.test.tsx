import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Table } from './Table';
import { vi } from 'vitest';

const renderWithPolaris = (ui: React.ReactElement) =>
  render(<AppProvider i18n={enTranslations}>{ui}</AppProvider>);

describe('Table component', () => {
  const headings = ['Name', 'Views'];
  const contentTypes: ('text' | 'numeric')[] = ['text', 'numeric'];
  const rows = [
    [<span key="1">Offer A</span>, 10],
    [<span key="2">Offer B</span>, 20],
  ];

  it('renders headings and rows', () => {
    renderWithPolaris(
      <Table
        contentTypes={contentTypes}
        headings={headings}
        rows={rows}
        rowCount={2}
        changePage={vi.fn()}
        paginationMode="client"
      />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Offer A')).toBeInTheDocument();
    expect(screen.getByText('Offer B')).toBeInTheDocument();
  });

  it('calls changePage when next page is clicked (server mode)', async () => {
    const mockChangePage = vi.fn().mockResolvedValue(undefined);

    renderWithPolaris(
      <Table
        contentTypes={contentTypes}
        headings={headings}
        rows={rows}
        rowCount={10}
        changePage={mockChangePage}
        paginationMode="server"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(mockChangePage).toHaveBeenCalledWith(2);
    });
  });

  it('calls searchOffer when typing in search field', async () => {
    const mockSearch = vi.fn().mockResolvedValue(undefined);

    renderWithPolaris(
      <Table
        contentTypes={contentTypes}
        headings={headings}
        rows={rows}
        rowCount={2}
        changePage={vi.fn()}
        searchOffer={mockSearch}
        paginationMode="server"
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'Offer' },
    });

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('Offer');
    });
  });
});
