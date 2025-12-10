import { Table } from '@/features/table/Table';
import { useState } from 'react';

const initialRows: React.ReactNode[][] = [
  [
    'Summer Sale',
    'Announcement bar',
    '2025-12-08',
    '123',
    '45',
    '3',
    'Active',
    'Edit/Delete',
  ],
  [
    'Winter Sale',
    'Popup',
    '2025-11-01',
    '67',
    '12',
    '1',
    'Inactive',
    'Edit/Delete',
  ],
  [
    'Spring Sale',
    'Banner',
    '2025-10-15',
    '89',
    '34',
    '5',
    'Active',
    'Edit/Delete',
  ],
];

export const TableExample = () => {
  const [rows, setRows] = useState<React.ReactNode[][]>(initialRows);
  const [offerCount, setOfferCount] = useState<number>(initialRows.length);
  const [noResults, setNoResults] = useState<boolean>(false);

  const headings = [
    'Offer Name',
    'Type',
    'Created',
    'Views',
    'Clicks',
    'Orders',
    'Status',
    'Actions',
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

  const changePage = async (page: number, query?: string) => {
    console.log('Fetching page', page, 'with query', query);

    const newRows: React.ReactNode[][] = [
      [
        `Offer ${page}-1`,
        'Announcement bar',
        '2025-12-08',
        '100',
        '20',
        '2',
        'Active',
        'Edit/Delete',
      ],
      [
        `Offer ${page}-2`,
        'Popup',
        '2025-12-09',
        '80',
        '15',
        '1',
        'Inactive',
        'Edit/Delete',
      ],
    ];

    setRows(newRows);
    setOfferCount(50);
  };

  const searchOffer = async (query: string) => {
    console.log('Searching for', query);

    const filteredRows: React.ReactNode[][] = [
      [
        `Result for ${query}`,
        'Banner',
        '2025-12-10',
        '120',
        '30',
        '4',
        'Active',
        'Edit/Delete',
      ],
    ];

    setRows(filteredRows);
    setOfferCount(filteredRows.length);
    setNoResults(filteredRows.length === 0);
  };

  return (
    <Table
      contentTypes={contentTypes}
      headings={headings}
      rows={rows}
      rowCount={offerCount}
      changePage={changePage}
      paginationMode="client"
      searchOffer={searchOffer}
      noResults={noResults}
      itemsPerPage={20}
    />
  );
};
