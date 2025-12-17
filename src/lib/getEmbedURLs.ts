// src/lib/getEmbedURLs.ts

export type EmbedURLs = Record<string, Record<string, string>>;

export const getEmbedURLs = (themeStoreId: string): EmbedURLs => {
  return {
    ugc: {
      index: `https://example.com/${themeStoreId}/ugc/index`,
      product: `https://example.com/${themeStoreId}/ugc/product`,
      cart: `https://example.com/${themeStoreId}/ugc/cart`,
      collection: `https://example.com/${themeStoreId}/ugc/collection`,
      collectionList: `https://example.com/${themeStoreId}/ugc/collectionList`,
    },
    // You can add more blocks dynamically if needed
  };
};
