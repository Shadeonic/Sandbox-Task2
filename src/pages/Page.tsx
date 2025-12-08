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
  console.log("Mock fetch for page", page, "query", query);

  const mockOffers: Offer[] = [
    {
      _id: "1",
      title: "Winter Sale",
      type: "Popup",
      createdAt: "2025-11-01",
      views: 67,
      clicks: 12,
      orders: 1,
      status: "Inactive",
    },
    {
      _id: "2",
      title: "Spring Sale",
      type: "Banner",
      createdAt: "2025-10-15",
      views: 89,
      clicks: 34,
      orders: 5,
      status: "Active",
    },
  ];

  const formattedRows = mockOffers.map((offer) => [
    <p key={offer._id} style={{ textDecoration: "underline" }}>{offer.title}</p>,
    offer.type,
    formatDate(offer.createdAt),
    offer.views,
    offer.clicks,
    offer.orders,
    offer.status,
  <Button variant="plain">Edit</Button>
  ]);

  setRows(formattedRows);
  setOfferCount(mockOffers.length);
  setNoResults(mockOffers.length === 0);
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
