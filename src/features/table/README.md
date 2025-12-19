# Table Component

A reusable React component built with Shopify Polaris that displays tabular data with support for:

- Client-side and server-side pagination
- Debounced server-side search
- Custom row rendering
- Loading and "no results" states

---

## Props

| Prop             | Type                                              | Description                                |
| ---------------- | ------------------------------------------------- | ------------------------------------------ |
| `contentTypes`   | `('text' \| 'numeric')[]`                         | Defines the type of each column            |
| `headings`       | `(string \| React.ReactNode)[]`                   | Column headers                             |
| `rows`           | `React.ReactNode[][]`                             | Table data rows                            |
| `rowCount`       | `number`                                          | Total number of rows (used for pagination) |
| `changePage`     | `(page: number, query?: string) => Promise<void>` | Callback for pagination                    |
| `paginationMode` | `'client'` \| `'server'`                          | Determines pagination strategy             |
| `searchOffer?`   | `(query: string) => Promise<void>`                | Optional search callback (debounced)       |
| `noResults?`     | `boolean`                                         | Whether to show a "no results" message     |
| `itemsPerPage?`  | `number`                                          | Items per page (default: 5)                |
| `loading?`       | `boolean`                                         | Optional external loading trigger          |

---

## Usage Example

```tsx
<Table
  contentTypes={['text', 'numeric']}
  headings={['Name', 'Views']}
  rows={[
  [<span>Offer A</span>, 10],
  [<span>Offer B</span>, 20],
  ]}
  rowCount={10}
  changePage={(page, query) => fetchData(page, query)}
  paginationMode="server"
  searchOffer={(query) => searchOffers(query)}
  loading={isLoading}
  noResults={false}
/>
---
```
