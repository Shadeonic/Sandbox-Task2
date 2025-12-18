import React, { useEffect, useState } from 'react';
import { Table } from '@/features/table/Table';
import { Button } from '@shopify/polaris';
import { ButtonGroup } from '@shopify/polaris';
import type { Offer } from '@/types/offer';
import { mockOffers } from '@/mocks/offers';

import {
  EditIcon,
  DuplicateIcon,
  DeleteIcon,
  SelectIcon,
  LanguageTranslateIcon,
} from '@shopify/polaris-icons';

// import type { BadgeProps } from "@shopify/polaris";
import ToggleStatus from '@/features/table/ToggleStatus';

/**
 * Represents a single offer displayed in the table.
 */


/**
 * Demo page that renders the Table component with mock offer data.
 * Supports client-side pagination and server-style search simulation.
 */

const Page: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  /**
   * Formats a date string into 'DD MMM YYYY' format (e.g., '03 Dec 2025').
   *
   * @param dateStr - ISO date string
   * @returns Formatted date string
   */

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  /**
   * Simulates fetching paginated offer data from a server.
   * Filters mock offers by search query if provided.
   *
   * @param page - Page number to fetch
   * @param query - Optional search query
   */

  const changePage = async (page: number, query?: string) => {
    console.log('Mock fetch for page', page, 'query', query);

    const filtered = query
      ? mockOffers.filter((offer) =>
          offer.title.toLowerCase().includes(query.toLowerCase())
        )
      : mockOffers;

    setOffers(filtered);
    setNoResults(filtered.length === 0);
  };

  /**
   * Triggers a new search by resetting to page 1 with the given query.
   *
   * @param query - Search term to filter offers
   */

  const searchOffer = async (query: string) => {
    await changePage(1, query);
  };

  useEffect(() => {
    changePage(1);
  }, []);

  const headings = [
    <span className="centerCell">Offer Name</span>,
    <span className="centerCell">Type</span>,
    <span className="centerCell">Created</span>,
    <span className="centerCell">Views</span>,
    <span className="centerCell">Clicks</span>,
    <span className="centerCell">Orders</span>,
    <span className="centerCell">Status</span>,
    <span className="centerCell">Actions</span>,
  ];

  const contentTypes: ('text' | 'numeric')[] = [
    'text',
    'text',
    'text',
    'numeric',
    'numeric',
    'numeric',
    'text',
    'text',
  ];

  // Transform offers into table rows with formatted cells and action buttons

  const rows = offers.map((offer, index) => [
    <p key={offer._id} style={{ textDecoration: 'underline' }}>
      {offer.title}
    </p>,
    offer.type,
    formatDate(offer.createdAt),
    offer.views,
    offer.clicks,
    offer.orders,
    <div className="centerCell">
      <ToggleStatus
        initialStatus={offer.status}
        onToggle={(newStatus) => console.log('Toggled:', offer._id, newStatus)}
      />
    </div>,
    <ButtonGroup gap="tight">
      <Button
        icon={LanguageTranslateIcon}
        onClick={() => console.log('Translate', offer._id)}
      />
      {index % 2 === 1 && (
        <>
          <Button
            icon={SelectIcon}
            onClick={() => console.log('Move Up', offer._id)}
          />
        </>
      )}
      <Button icon={EditIcon} onClick={() => console.log('Edit', offer._id)} />
      <Button
        icon={DuplicateIcon}
        onClick={() => console.log('Duplicate', offer._id)}
      />
      <Button
        icon={DeleteIcon}
        tone="critical"
        onClick={() => console.log('Delete', offer._id)}
      />
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
