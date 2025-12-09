import React, { useEffect, useMemo, useState } from "react";
import { Table } from "@/features/table/Table";
import { Button } from "@shopify/polaris";

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

const PAGE_SIZE = 5;

const Page: React.FC = () => {
  
  const [allOffers, setAllOffers] = useState<Offer[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]); // текущая страница
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [paginationMode, setPaginationMode] = useState<"client" | "server">("client");


  // 1) Загружаем (или мокаем) минимум 10 офферов
  useEffect(() => {
    const mockOffers: Offer[] = [
      { _id: "1",  title: "Winter Sale",  type: "Popup",  createdAt: "2025-11-01", views: 67,  clicks: 12, orders: 1,  status: "Inactive" },
      { _id: "2",  title: "Spring Sale",  type: "Banner", createdAt: "2025-10-15", views: 89,  clicks: 34, orders: 5,  status: "Active" },
      { _id: "3",  title: "Summer Blast", type: "Popup",  createdAt: "2025-08-10", views: 120, clicks: 50, orders: 10, status: "Active" },
      { _id: "4",  title: "Autumn Deals", type: "Banner", createdAt: "2025-09-20", views: 45,  clicks: 8,  orders: 2,  status: "Inactive" },
      { _id: "5",  title: "Flash Friday", type: "Popup",  createdAt: "2025-12-01", views: 300, clicks: 90, orders: 25, status: "Active" },
      { _id: "6",  title: "Cyber Monday", type: "Banner", createdAt: "2025-12-02", views: 250, clicks: 70, orders: 20, status: "Active" },
      { _id: "7",  title: "Boxing Day",   type: "Popup",  createdAt: "2025-12-26", views: 180, clicks: 40, orders: 12, status: "Inactive" },
      { _id: "8",  title: "Weekend Deal", type: "Banner", createdAt: "2025-11-14", views: 95,  clicks: 22, orders: 6,  status: "Active" },
      { _id: "9",  title: "Limited Drop", type: "Popup",  createdAt: "2025-10-05", views: 75,  clicks: 19, orders: 4,  status: "Inactive" },
      { _id: "10", title: "New Year",     type: "Banner", createdAt: "2025-12-31", views: 310, clicks: 85, orders: 27, status: "Active" },
      { _id: "11", title: "Mega Promo",   type: "Popup",  createdAt: "2025-11-22", views: 140, clicks: 33, orders: 8,  status: "Active" },
    ];
    setAllOffers(mockOffers);
  }, []);

  // 2) Фильтрация по query
  const filtered = useMemo(() => {
    if (!query.trim()) return allOffers;
    return allOffers.filter((offer) =>
      offer.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [allOffers, query]);

  const total = filtered.length;
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdxEx = startIdx + PAGE_SIZE;

  // 3) Срез текущей страницы
  useEffect(() => {
    const slice = filtered.slice(startIdx, endIdxEx);
    setOffers(slice);
    setNoResults(slice.length === 0);
  }, [filtered, page]);

  // 4) Метка диапазона
  const from = total === 0 ? 0 : startIdx + 1;
  const to = Math.min(endIdxEx, total);
  const label = `Showing ${from}–${to} of ${total} results`;

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  const headings = ["Offer Name", "Type", "Created", "Views", "Clicks", "Orders", "Status", "Actions"];
  const contentTypes: ("text" | "numeric")[] = ["text", "text", "text", "numeric", "numeric", "numeric", "text", "text"];

  const rows = offers.map((offer) => [
    <p key={offer._id} style={{ textDecoration: "underline", verticalAlign: "middle" }}>{offer.title}</p>,
    offer.type,
    formatDate(offer.createdAt),
    offer.views,
    offer.clicks,
    offer.orders,
    offer.status,
    <Button variant="plain">Edit</Button>,
  ]);

  // 5) Поиск: сбрасываем на первую страницу
  const searchOffer = async (q: string) => {
    setQuery(q);
    setPage(1);
  };

  // 6) Переход на страницу (кнопки Next/Prev внутри Table должны дергать это)
  const changePage = async (newPage: number) => {
    setPage((p) => (newPage < 1 ? 1 : newPage));
  };

  return (
    <Table
      contentTypes={contentTypes}
      headings={headings}
      rows={rows}
      rowCount={total}      // можно оставить, но для диапазона используем label
      paginationMode={paginationMode}
      page={page}
      pageSize={PAGE_SIZE}
      total={total}
      label={label}
      changePage={changePage}
      searchOffer={searchOffer}
      noResults={noResults}
      loading={loading}
    />
  );
};

export default Page;
