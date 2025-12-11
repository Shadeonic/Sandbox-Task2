import { useAppBridge } from '@shopify/app-bridge-react';
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
import './Table.css';

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
 *
 * @component
 * @param contentTypes - Array of column content types ('text' or 'numeric')
 * @param headings - Array of column headings (text or React nodes)
 * @param rows - 2D array of React nodes representing table rows
 * @param rowCount - Total number of rows (used for pagination)
 * @param changePage - Callback for server-side pagination
 * @param paginationMode - Determines pagination strategy ('client' or 'server')
 * @param searchOffer - Optional callback for server-side search
 * @param noResults - Whether to show a "no results" message
 * @param itemsPerPage - Number of items per page (default: 5)
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
  const [searching, setSearching] = useState<{
    query: string;
    isSearching: boolean;
  }>({
    query: '',
    isSearching: false,
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    if (paginationMode === 'client') {
      setDisplayRows(rows.slice(startIndex, endIndex));
    }
  }, [currentPage, rows, paginationMode]);

  /**
   * Mock loading handler to simulate Shopify App Bridge loading state.
   *
   * @param state - Whether to show or hide loading indicator
   */

  useEffect(() => {
    if (searchOffer && debouncedSearch !== '') {
      shopify.loading(true);
      setLoading(true);
      setCurrentPage(1);
      searchOffer(debouncedSearch).then(() => {
        shopify.loading(false);
        setLoading(false);
        setSearching({ query: debouncedSearch, isSearching: true });
      });
    }
  }, [debouncedSearch]);

  /**
   * Handles pagination logic based on the current mode.
   * - In server mode, triggers `changePage` with optional search query.
   * - In client mode, just updates local page state.
   *
   * @param newPage - The page number to navigate to
   */

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (paginationMode === 'server') {
      setLoading(true);
      if (searching.isSearching) {
        changePage(newPage, searching.query).then(() => {
          setLoading(false);
        });
        return;
      }
      changePage(newPage).then(() => {
        setLoading(false);
      });
    }
  };

  const shopify = {
    loading: (state: boolean) => {
      console.log('Mock loading:', state);
    },
  };

  /**
   * Placeholder rows shown while loading data.
   * Uses Polaris SkeletonTabs to simulate table content.
   */
  const skeletonRows = Array(3).fill(
    Array(headings.length).fill(<SkeletonTabs count={1} />)
  );
  /**
   * Pagination label for client-side mode.
   */
  let clientLabel = `Showing ${startIndex + 1}-${Math.min(
    endIndex,
    paginationMode === 'client' ? rows.length : rowCount
  )} 
    of ${paginationMode === 'client' ? rows.length : rowCount} results`;

  let serverClient = `Showing ${startIndex + 1}-${Math.min(
    endIndex,
    paginationMode === 'client' ? rows.length : rowCount
  )} 
    of ${paginationMode === 'client' ? rows.length : rowCount} results`;

  /**
   * Wraps each cell in a div for vertical centering.
   *
   * @param inputRows - 2D array of React nodes (table rows)
   * @returns Wrapped rows with centered cells
   */

  const wrapRows = (inputRows: React.ReactNode[][]): React.ReactNode[][] => {
    return inputRows.map((row) =>
      row.map((cell, i) => (
        <div key={i} className="centerCell">
          {cell}
        </div>
      ))
    );
  };

  return searchOffer ? (
    <Card>
      <InlineStack align="start" blockAlign="center" gap="200" wrap={false}>
        <Box width="100%">
          <TextField
            label="Search"
            type="text"
            placeholder={t('Search Offers') || 'Search'}
            value={search}
            onChange={(value) => setSearch(value)}
            autoComplete="off"
          />
        </Box>
        <Box>
          <InlineStack>
            <Button
              onClick={() => {
                shopify.loading(true);
                setLoading(true);
                setCurrentPage(1);
                if (search === '') {
                  setSearching({ query: '', isSearching: false });
                }

                searchOffer(search).then(() => {
                  shopify.loading(false);
                  setLoading(false);
                  setSearching({ query: search, isSearching: true });
                });
              }}
              size="large"
              variant="primary"
              icon={SearchIcon}
            ></Button>
          </InlineStack>
        </Box>
      </InlineStack>
      {noResults ? (
        <InlineError
          message={t('Table.noOffers') || 'No offers found'}
          fieldID="myFieldID"
        />
      ) : (
        <div className="offersTableWrapper">
          <DataTable
            columnContentTypes={contentTypes}
            headings={headings}
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
                  hasNext={
                    paginationMode === 'client'
                      ? currentPage * itemsPerPage < rows.length
                      : currentPage * itemsPerPage < rowCount
                  }
                  onNext={() => handlePageChange(currentPage + 1)}
                  label={
                    paginationMode === 'client' ? clientLabel : serverClient
                  }
                />
              </InlineStack>
            }
          />
        </div>
      )}
    </Card>
  ) : noResults ? (
    <InlineError
      message={t('Table.noOffers') || 'No offers found'}
      fieldID="offersTable"
    />
  ) : (
    <div className="offersTableWrapper">
      <DataTable
        columnContentTypes={contentTypes}
        headings={headings}
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
              hasNext={
                paginationMode === 'client'
                  ? currentPage * itemsPerPage < rows.length
                  : currentPage * itemsPerPage < rowCount
              }
              onNext={() => handlePageChange(currentPage + 1)}
              label={paginationMode === 'client' ? clientLabel : serverClient}
            />
          </InlineStack>
        }
      />
    </div>
  );
};
