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
  const [currentPage, setCurrentPage] = useState<number>(page ?? 1);
  const [displayRows, setDisplayRows] = useState<React.ReactNode[][]>([]);
  const [search, setSearch] = useState<string>("");

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
            />
          </InlineStack>
        }
      />
    </Card>
  );
};