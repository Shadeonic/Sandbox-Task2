import React, { useEffect, useState } from "react";
import { Table } from "@/features/table/Table";
import {
  Button,
  ButtonGroup,
  InlineStack,
  Text,
} from "@shopify/polaris";
import {
  EditIcon,
  DeleteIcon,
  DuplicateIcon,
} from "@shopify/polaris-icons";

interface Offer {
  _id: string;
  title: string;
  type: string;
  createdAt: string;
  views: number;
  clicks: number;
  orders: number;
  status: string;
}

const Page: React.FC = () => {
  const [rows, setRows] = useState<React.ReactNode[][]>([]);
  const [offerCount, setOfferCount] = useState<number>(0);
  const [noResults, setNoResults] = useState<boolean>(false);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const changePage = async (page: number, query?: string) => {
    try {
      const response = await fetch(`/api/offers?page=${page}&q=${query || ""}`);
      const data = await response.json();

      const formattedRows = data.items.map((offer: Offer) => [
        <p
          className="Lo-Link-P"
          style={{ cursor: "pointer", textDecoration: "underline" }}
          key={offer._id}
          onClick={() => {}}
        >
          {offer.title}
        </p>,
        <Text variant="bodyMd" as="span">{offer.type}</Text>,
        <Text variant="bodyMd" as="span">{formatDate(offer.createdAt)}</Text>,
        <Text variant="bodyMd" as="span">{offer.views}</Text>,
        <Text variant="bodyMd" as="span">{offer.clicks}</Text>,
        <Text variant="bodyMd" as="span">{offer.orders}</Text>,
        <Text variant="bodyMd" as="span">{offer.status}</Text>,
        <ButtonGroup>
          <InlineStack blockAlign="center" gap="100">
            <Button icon={EditIcon} accessibilityLabel="Edit" onClick={() => {}} />
            <Button icon={DuplicateIcon} accessibilityLabel="Copy" onClick={() => {}} variant="plain" />
            <Button icon={DeleteIcon} accessibilityLabel="Delete" variant="plain" tone="critical" onClick={() => {}} />
          </InlineStack>
        </ButtonGroup>,
      ]);

      setRows(formattedRows);
      setOfferCount(data.total);
      setNoResults(data.total === 0);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
  };

  const searchOffer = async (query: string) => {
    await changePage(1, query);
  };

  useEffect(() => {
    changePage(1);
  }, []);

  const headings = [
    "Offer Name",
    "Type",
    "Created",
    "Views",
    "Clicks",
    "Orders",
    "Status",
    "Actions",
  ];

  const contentTypes: ("text" | "numeric")[] = [
    "text", "text", "text", "text", "text", "text", "text", "text",
  ];

  return (
    <Table
      contentTypes={contentTypes}
      headings={headings}
      rows={rows}
      rowCount={offerCount}
      changePage={changePage}
      searchOffer={searchOffer}
      paginationMode="server"
      noResults={noResults}
    />
  );
};

export default Page;
