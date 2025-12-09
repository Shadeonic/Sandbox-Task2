import React, { useEffect, useState } from "react";
import { Table } from "@/features/table/Table";
import { Button } from "@shopify/polaris";
import { ButtonGroup } from "@shopify/polaris";

import type { BadgeProps } from "@shopify/polaris";
import ToggleStatus from "@/features/table/ToggleStatus";

interface Offer {
  _id: string;
  title: string;
  type: string;
  createdAt: string;
  views: number;
  clicks: number;
  orders: number;
  status: "Active" | "Inactive";
}

const Page: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
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
      {
        _id: "3",
        title: "Summer Blast",
        type: "Popup",
        createdAt: "2025-08-10",
        views: 120,
        clicks: 50,
        orders: 10,
        status: "Active",
      },
      {
        _id: "4",
        title: "Autumn Deals",
        type: "Banner",
        createdAt: "2025-09-20",
        views: 45,
        clicks: 8,
        orders: 2,
        status: "Inactive",
      },
      {
        _id: "5",
        title: "Flash Friday",
        type: "Popup",
        createdAt: "2025-12-01",
        views: 300,
        clicks: 90,
        orders: 25,
        status: "Active",
      },
      {
        _id: "6",
        title: "Cyber Monday",
        type: "Banner",
        createdAt: "2025-12-02",
        views: 250,
        clicks: 70,
        orders: 20,
        status: "Active",
      },
    ];

    const filtered = query
      ? mockOffers.filter((offer) =>
          offer.title.toLowerCase().includes(query.toLowerCase())
        )
      : mockOffers;

    setOffers(filtered);
    setNoResults(filtered.length === 0);
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
    "text",
    "text",
    "text",
    "numeric",
    "numeric",
    "numeric",
    "text",
    "text",
  ];

  const rows = offers.map((offer) => [
    <p key={offer._id} style={{ textDecoration: "underline" }}>{offer.title}</p>,
    offer.type,
    formatDate(offer.createdAt),
    offer.views,
    offer.clicks,
    offer.orders,
    <ToggleStatus
      initialStatus={offer.status}
      onToggle={(newStatus) => console.log("Toggled:", offer._id, newStatus)}
    />,
    <ButtonGroup>
      <Button onClick={() => console.log("Edit", offer._id)}>Edit</Button>
      <Button onClick={() => console.log("Move", offer._id)}>Move</Button>
      <Button onClick={() => console.log("Duplicate", offer._id)}>Duplicate</Button>
      <Button tone="critical" onClick={() => console.log("Delete", offer._id)}>Delete</Button>
    </ButtonGroup>,
  ]);


  return (
    <Table
      contentTypes={contentTypes}
      headings={headings}
      rows={rows}
      rowCount={offers.length}
      changePage={changePage}
      searchOffer={searchOffer}
      paginationMode="client"
      noResults={noResults}
    />
  );
};

export default Page;