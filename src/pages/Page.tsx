import React, { useEffect, useState } from 'react';
import { Table } from '@/features/table/Table';
import { Button } from '@shopify/polaris';
import { ButtonGroup } from '@shopify/polaris';
import {
  EditIcon,
  DuplicateIcon,
  DeleteIcon,
  SelectIcon,
  LanguageTranslateIcon,
} from '@shopify/polaris-icons';

// import type { BadgeProps } from "@shopify/polaris";
import ToggleStatus from '@/features/table/ToggleStatus';

interface Offer {
  _id: string;
  title: string;
  type: string;
  createdAt: string;
  views: number;
  clicks: number;
  orders: number;
  status: 'Active' | 'Inactive';
}

const Page: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const changePage = async (page: number, query?: string) => {
    console.log('Mock fetch for page', page, 'query', query);

    const mockOffers: Offer[] = [
      {
        _id: '1',
        title: 'Volume discount #3',
        type: 'Volume Discount',
        createdAt: '2025-12-03',
        views: 0,
        clicks: 0,
        orders: 0,
        status: 'Active',
      },
      {
        _id: '2',
        title: 'Product addons #2',
        type: 'Product Add-ons',
        createdAt: '2025-11-20',
        views: 0,
        clicks: 0,
        orders: 0,
        status: 'Inactive',
      },
      {
        _id: '3',
        title: 'Cart drawer addons #2',
        type: 'Cart Drawer Add-ons',
        createdAt: '2025-10-28',
        views: 0,
        clicks: 0,
        orders: 0,
        status: 'Active',
      },
      {
        _id: '4',
        title: 'Product addons #1',
        type: 'Product Add-ons',
        createdAt: '2025-09-11',
        views: 0,
        clicks: 0,
        orders: 0,
        status: 'Inactive',
      },
      {
        _id: '5',
        title: 'Volume discount #2',
        type: 'Volume Discount',
        createdAt: '2025-09-09',
        views: 0,
        clicks: 0,
        orders: 0,
        status: 'Inactive',
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
