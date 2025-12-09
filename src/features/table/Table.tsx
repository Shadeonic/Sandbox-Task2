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
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "@shopify/polaris-icons";
import { t } from "i18next";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

interface TableProps {
  contentTypes: ("text" | "numeric")[];
  headings: (string | React.ReactNode)[];
  rows: React.ReactNode[][];
  rowCount: number;
  changePage: (page: number, query?: string) => Promise<void>;
  paginationMode: "client" | "server";
  searchOffer?: (query: string) => Promise<void>;
  noResults?: boolean;
  itemsPerPage?: number;
  page?: number;
  pageSize?: number;
  total?: number;
  label?: string;
  loading?: boolean;
}

/**
 *  Data table with pagination.
 *
 * @function
 * @param {Array} contentTypes - The content types.
 * @param {Array} headings - The headings.
 * @param {Array} rows - The rows you want to display.
 * @param {number} rowCount - The total number of rows.
 * @param {function} changePage - The function to change the page.
 * @param {string} paginationMode - The pagination mode.
 * @param {function} searchOffer - The function to search the offer, tells whether or not the component gonna have search.
 * @param {boolean} noResults - Whether or not there are no results found.
 * @param {number} itemsPerPage - Number of items per page. Default is 5.
 * @returns {JSX.Element} Data table.
 * @example
 *
 * Announcement Bar Table Example
 *
 * // Example headings
 * const headings = [
 *   "Offers Name",
 *   "Status",
 *   "Type",
 *   "Views",
 *   "Actions",
 * ];
 *
 * // Example rows
 * const rows = [
 *   [
 * // Offers Name:
 *     "Summer Sale",
 * // Status:
 *     <ToggleStatus/>,
 * // Type:
 *     "Announcement bar",
 * // Views:
 *     stats.barStats[bar.id] ? stats.barStats[bar.id].views : 0,
 * // Actions:
 *     <ButtonGroup>
 *           <Button
 *             icon={EditIcon}
 *             accessibilityLabel="Edit"
 *           />
 *           <Button
 *             icon={DeleteIcon}
 *             accessibilityLabel="Delete"
 *             variant="plain"
 *             tone="critical"
 *           />
 *      </ButtonGroup>,
 *   ],
 * ];
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
  page,
  total,
  label,
  loading,
}) => {
<<<<<<< HEAD
  const [currentPage, setCurrentPage] = useState<number>(page ?? 1);
  const [displayRows, setDisplayRows] = useState<React.ReactNode[][]>([]);
  const [search, setSearch] = useState<string>("");
=======
const [currentPage, setCurrentPage] = useState<number>(1);
const [displayRows, setDisplayRows] = useState<React.ReactNode[][]>([]);
const [loading, setLoading] = useState<boolean>(false);
const [search, setSearch] = useState<string>("");
const debouncedSearch = useDebounce(search, 500); // 500ms delay
const [searching, setSearching] = useState<{ query: string; isSearching: boolean }>({
  query: "",
  isSearching: false,
});
>>>>>>> bbb4951b3f55c5776ada82935c149171dae8c7d6

  // синхронизация page из пропсов
  useEffect(() => {
    if (page !== undefined) {
      setCurrentPage(page);
    }
  }, [page]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    if (paginationMode === "client") {
      setDisplayRows(rows.slice(startIndex, endIndex));
    } else {
      setDisplayRows(rows); // сервер уже присылает sliced
    }
  }, [currentPage, rows, paginationMode]);

  useEffect(() => {
  if (searchOffer && debouncedSearch !== "") {
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
    if (paginationMode === "server") {
      changePage(newPage, search);
    }
  };

  const skeletonRows = Array(itemsPerPage).fill(
    Array(headings.length).fill(<SkeletonTabs count={1} />)
  );

  const clientLabel = `Showing ${startIndex + 1}-${Math.min(endIndex, rows.length)} of ${rows.length} results`;
  const serverLabel = `Showing ${startIndex + 1}-${Math.min(endIndex, rowCount)} of ${rowCount} results`;

  return (
    <Card>
<<<<<<< HEAD
      {searchOffer && (
        <InlineStack align="start" blockAlign="center" gap="200" wrap={false}>
          <Box width="100%">
            <TextField
              label="Search"
              type="text"
              placeholder={t("Table.search") || "Search"}
              value={search}
              onChange={(value) => setSearch(value)}
              autoComplete="off"
            />
          </Box>
          <Box>
            <InlineStack>
              <Button
                onClick={() => {
                  setCurrentPage(1);
                  searchOffer(search);
                }}
                size="large"
                variant="primary"
                icon={SearchIcon}
              />
            </InlineStack>
          </Box>
        </InlineStack>
      )}

      {noResults && !loading && (
        <InlineError message={t("Table.noOffers") || "No offers found"} fieldID="offersTable" />
      )}

      <DataTable
        columnContentTypes={contentTypes}
        headings={headings}
        rows={
          loading
            ? skeletonRows
            : noResults
            ? []
            : displayRows
        }
        footerContent={
          <InlineStack align="center" wrap={false} gap="400">
            <Pagination
              hasPrevious={currentPage > 1}
              onPrevious={() => handlePageChange(currentPage - 1)}
              hasNext={
                paginationMode === "client"
                  ? currentPage * itemsPerPage < rows.length
                  : currentPage * itemsPerPage < rowCount
              }
              onNext={() => handlePageChange(currentPage + 1)}
              label={label ?? (paginationMode === "client" ? clientLabel : serverLabel)}
=======
      <InlineStack align="start" blockAlign="center" gap="200" wrap={false}>
        <Box width="100%">
          <TextField
            label="Search"
            type="text"
            placeholder={t("Search Offers") || "Search"}
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
                if (search === "") {
                  setSearching({ query: "", isSearching: false });
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
        <InlineError message={t("Table.noOffers") || "No offers found"} fieldID="myFieldID" />
        ) : (
          <div className="offersTableWrapper">
            <DataTable
              columnContentTypes={contentTypes}
              headings={headings}
              rows={
                loading
                  ? skeletonRows
                  : paginationMode === "client"
                  ? displayRows
                  : rows
              }
              footerContent={
                <InlineStack align="center" wrap={false} gap="400">
                  <Pagination
                    hasPrevious={currentPage > 1}
                    onPrevious={() => handlePageChange(currentPage - 1)}
                    hasNext={
                      paginationMode === "client"
                        ? currentPage * itemsPerPage < rows.length
                        : currentPage * itemsPerPage < rowCount
                    }
                    onNext={() => handlePageChange(currentPage + 1)}
                    label={paginationMode === "client" ? clientLabel : serverClient}
                  />
                </InlineStack>
              }
>>>>>>> bbb4951b3f55c5776ada82935c149171dae8c7d6
            />
          </div>
        )}
    </Card>
<<<<<<< HEAD
=======
  ) : (
  noResults ? (
  <InlineError message={t("Table.noOffers") || "No offers found"} fieldID="offersTable" />
) : (
  <div className="offersTableWrapper">
    <DataTable
      columnContentTypes={contentTypes}
      headings={headings}
      rows={
        loading
          ? skeletonRows
          : paginationMode === "client"
          ? displayRows
          : rows
      }
      footerContent={
        <InlineStack align="center" wrap={false} gap="400">
          <Pagination
            hasPrevious={currentPage > 1}
            onPrevious={() => handlePageChange(currentPage - 1)}
            hasNext={
              paginationMode === "client"
                ? currentPage * itemsPerPage < rows.length
                : currentPage * itemsPerPage < rowCount
            }
            onNext={() => handlePageChange(currentPage + 1)}
            label={paginationMode === "client" ? clientLabel : serverClient}
          />
        </InlineStack>
      }
    />
  </div>
)

>>>>>>> bbb4951b3f55c5776ada82935c149171dae8c7d6
  );
};