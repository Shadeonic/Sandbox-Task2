# Page Component

The `Page` component serves as the main container for displaying and managing a list of offers using the `Table` component. It handles data fetching, search filtering, pagination, and loading states.

---

## Features

- Fetches and displays offer data
- Integrates with the reusable `Table` component
- Implements server-side pagination
- Supports debounced search functionality
- Displays loading indicators and "no results" messages

---

## Internal State

| State Variable | Type            | Description                             |
| -------------- | --------------- | --------------------------------------- |
| `offers`       | `ReactNode[][]` | Table rows generated from fetched data  |
| `loading`      | `boolean`       | Indicates whether data is being fetched |
| `noResults`    | `boolean`       | Whether the search returned no results  |
| `query`        | `string`        | Current search input                    |
| `page`         | `number`        | Current page number                     |

---

## Usage

This component is typically used as a full-page view. It renders the `Table` and manages its props dynamically:

```tsx
<Page />
```

---

## Behavior

- On mount, fetches the first page of offers
- When the user types in the search field:
- Debounces the input
- Triggers a new fetch with the query
- When the user paginates:
- Updates the page number
- Fetches the corresponding page of results
- Displays a "No results found" message if the search returns an empty array

---

## Test Coverage

Tests are located in Page.test.tsx and include:

- Renders the table with mock offers
- Filters offers based on search input
- Displays "no results" message when search yields nothing
- Mocks loading state transitions during fetch

---

## Notes

- Uses useEffect to trigger data fetching on mount and when page or query changes
- Relies on a mock fetchOffers function for testing
- Designed to be extended with real API integration

---
