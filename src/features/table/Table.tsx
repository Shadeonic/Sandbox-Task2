import {
  Box,
  Button,
  Card,
  DataTable,
  InlineError,
  InlineStack,
  Pagination,
  SkeletonTabs,
  TextField,
} from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@shopify/polaris-icons';
import { t } from 'i18next';

/**
 * Custom hook that returns a debounced version of a value.
 *
 * @template T
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

interface TableProps {
  /** Column content types: 'text' or 'numeric' */
  contentTypes: ('text' | 'numeric')[];
  /** Column headers */
  headings: (string | React.ReactNode)[];
  /** Table data rows */
  rows: React.ReactNode[][];
  /** Total number of rows (used for pagination) */
  rowCount: number;
  /** Callback for server-side pagination */
  changePage: (page: number, query?: string) => Promise<void>;
  /** Pagination strategy: 'client' or 'server' */
  paginationMode: 'client' | 'server';
  /** Optional callback for server-side search */
  searchOffer?: (query: string) => Promise<void>;
  /** Whether to show a "no results" message */
  noResults?: boolean;
  /** Number of items per page (default: 5) */
  itemsPerPage?: number;
}

/**
 * Reusable Table component with support for:
 * - Client-side and server-side pagination
 * - Server-side search with debounced input
 * - Custom row rendering and action buttons
 * - Loading states and "no results" handling
 */
export const Table: React.FC<TableProps> = ({
  contentTypes,
  headings,
  rows,
  rowCount,
  changePage,
  paginationMode,
  searchOffer,
  noResults,
  itemsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayRows, setDisplayRows] = useState<React.ReactNode[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);
  const [searching, setSearching] = useState<{ query: string; isSearching: boolean }>({
    query: '',
    isSearching: false,
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  /**
   * Mock loading handler to simulate Shopify App Bridge loading state.
   */
  const shopify = {
    loading: (state: boolean) => {
      console.log('Mock loading:', state);
    },
  };

  /**
   * Centralized search handler.
   * Used by both debounced input and search button.
   *
   * @param query - Search query string
   */
  const executeSearch = (query: string) => {
    if (!searchOffer) return;

    shopify.loading(true);
    setLoading(true);
    setCurrentPage(1);

    searchOffer(query).then(() => {
      shopify.loading(false);
      setLoading(false);
      setSearching({
        query,
        isSearching: query !== '',
      });
    });
  };

  /**
   * Client-side pagination logic.
   * Slices rows based on current page.
   */
  useEffect(() => {
    if (paginationMode === 'client') {
      setDisplayRows(rows.slice(startIndex, endIndex));
    }
  }, [currentPage, rows, paginationMode, startIndex, endIndex]);

  /**
   * Trigger search when debounced value changes.
   */
  useEffect(() => {
    executeSearch(debouncedSearch);
  }, [debouncedSearch]);

  /**
   * Handles pagination logic based on the current mode.
   *
   * @param newPage - The page number to navigate to
   */
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    if (paginationMode === 'server') {
      setLoading(true);
      const query = searching.isSearching ? searching.query : undefined;

      changePage(newPage, query).finally(() => setLoading(false));
    }
  };

  /**
   * Placeholder rows shown while loading data.
   */
  const skeletonRows = Array(3).fill(
    Array(headings.length).fill(<SkeletonTabs count={1} />)
  );

  /**
   * Pagination label (shared for client and server mode).
   */
  const totalItems = paginationMode === 'client' ? rows.length : rowCount;

  const paginationLabel = `Showing ${startIndex + 1}-${Math.min(
    endIndex,
    totalItems
  )} of ${totalItems} results`;

  /**
   * Wraps each table cell for vertical alignment.
   */
  const wrapRows = (inputRows: React.ReactNode[][]): React.ReactNode[][] =>
    inputRows.map((row) =>
      row.map((cell, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            textAlign: 'left',
            width: '100%',
            height: '100%',
          }}
        >
          {cell}
        </div>
      ))
    );

  /**
   * Table headings aligned to the left.
   */
  const wrappedHeadings = headings.map((heading, i) => (
    <div key={i} style={{ textAlign: 'left' }}>
      {heading}
    </div>
  ));

  const tableContent = (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <DataTable
        columnContentTypes={contentTypes}
        headings={wrappedHeadings}
        rows={
          loading
            ? skeletonRows
            : paginationMode === 'client'
            ? wrapRows(displayRows)
            : wrapRows(rows)
        }
        footerContent={
          <InlineStack align="center" wrap={false} gap="400">
            <Pagination
              hasPrevious={currentPage > 1}
              onPrevious={() => handlePageChange(currentPage - 1)}
              hasNext={currentPage * itemsPerPage < totalItems}
              onNext={() => handlePageChange(currentPage + 1)}
              label={paginationLabel}
            />
          </InlineStack>
        }
      />
    </div>
  );

  return searchOffer ? (
    <Card>
      <InlineStack align="start" blockAlign="center" gap="200" wrap={false}>
        <Box width="100%">
          <TextField
            label={t('Search') || 'Search'}
            placeholder={t('Search Offers') || 'Search'}
            value={search}
            onChange={setSearch}
            autoComplete="off"
          />
        </Box>
        <Button
          onClick={() => executeSearch(search)}
          size="large"
          variant="primary"
          icon={SearchIcon}
        />
      </InlineStack>

      {noResults ? (
        <InlineError
          message={t('Table.noOffers') || 'No offers found'}
          fieldID="offersTable"
        />
      ) : (
        tableContent
      )}
    </Card>
  ) : noResults ? (
    <InlineError
      message={t('Table.noOffers') || 'No offers found'}
      fieldID="offersTable"
    />
  ) : (
    tableContent
  );
};
