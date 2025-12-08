import { useAppBridge } from "@shopify/app-bridge-react";
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
}) => {
const [currentPage, setCurrentPage] = useState<number>(1);
const [displayRows, setDisplayRows] = useState<React.ReactNode[][]>([]);
const [loading, setLoading] = useState<boolean>(false);
const [search, setSearch] = useState<string>("");
const [searching, setSearching] = useState<{ query: string; isSearching: boolean }>({
  query: "",
  isSearching: false,
});

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;


  useEffect(() => {
    if (paginationMode === "client") {
      setDisplayRows(rows.slice(startIndex, endIndex));
    }
  }, [currentPage, rows, paginationMode]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (paginationMode === "server") {
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

  const shopify = useAppBridge();

  const skeletonRows = Array(3).fill(Array(headings.length).fill(<SkeletonTabs count={1} />));

  let clientLabel = `${t("Table.showing") || "Showing"} ${startIndex + 1}-${
    rows.length < endIndex ? rows.length : endIndex
  } ${t("Table.of")} ${rows.length} ${
    rows.length == 1 ? t("Table.result") || "result" : t("Table.results") || "results"
  }`;

  let serverClient = `${t("Table.showing") || "Showing"} ${startIndex + 1}-${
    rowCount < endIndex ? rowCount : endIndex
  } ${t("Table.of") || "of"} ${rowCount} ${
    rowCount == 1 ? t("Table.result") || "result" : t("Table.results") || "results"
  }`;

  return searchOffer ? (
    <Card>
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
      {noResults && (
        <InlineError message={t("Table.noOffers") || "No offers found"} fieldID="myFieldID" />
      )}
      <DataTable
        columnContentTypes={contentTypes}
        headings={headings}
        rows={
          paginationMode === "client"
            ? rows.length === 0
              ? skeletonRows
              : displayRows
            : displayRows
            ? skeletonRows
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
    </Card>
  ) : (
    <DataTable
      columnContentTypes={contentTypes}
      headings={headings}
      rows={
        paginationMode === "client"
          ? rows.length === 0
            ? skeletonRows
            : rows.slice(startIndex, endIndex)
          : rowCount === 0 || loading
          ? skeletonRows
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
  );
};
