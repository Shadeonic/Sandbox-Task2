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

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

interface TableProps {
  contentTypes: ('text' | 'numeric')[];
  headings: (string | React.ReactNode)[];
  rows: React.ReactNode[][];
  rowCount: number;
  changePage: (page: number, query?: string) => Promise<void>;
  paginationMode: 'client' | 'server';
  searchOffer?: (query: string) => Promise<void>;
  noResults?: boolean;
  itemsPerPage?: number;
}

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

  const skeletonRows = Array(3).fill(
    Array(headings.length).fill(<SkeletonTabs count={1} />)
  );

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
