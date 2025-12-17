import {
  ActionList,
  BlockStack,
  Button,
  Card,
  Divider,
  Icon,
  InlineStack,
  Link,
  Popover,
  Text,
} from "@shopify/polaris";
import type { IconSource } from "@shopify/polaris";
import {
  AppExtensionIcon,
  CartIcon,
  CollectionFeaturedIcon,
  CollectionListIcon,
  HomeIcon,
  ProductIcon,
  ChatIcon,
  ExternalIcon,
} from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { getEmbedURLs } from "@/lib/getEmbedURLs";

type PageMap = Record<string, boolean>;
type AllBlocks = Record<string, PageMap>;

interface EmbedStatusProps {
  allBlocks: AllBlocks;
  themeStoreId: string;
  availablePages?: string[];
}

const defaultPages = ["index", "product", "cart", "collection", "collectionList"];

const pageLabelMap: Record<string, string> = {
  index: "Home",
  product: "Product",
  cart: "Cart",
  collection: "Collection",
  collectionList: "Collection List",
};

const blockLabelMap: Record<string, string> = {
  ugc: "UGC Carousel",
};

const iconMap = (page: string): IconSource => {
  switch (page) {
    case "index":
      return HomeIcon;
    case "product":
      return ProductIcon;
    case "cart":
      return CartIcon;
    case "collection":
      return CollectionFeaturedIcon;
    case "collectionList":
      return CollectionListIcon;
    default:
      return AppExtensionIcon;
  }
};

export const EmbedStatus: React.FC<EmbedStatusProps> = ({
  allBlocks,
  themeStoreId,
  availablePages,
}) => {
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  const toggleActive = useCallback((block: string) => {
    setActiveBlock((prev) => (prev === block ? null : block));
  }, []);

  const renderActivator = (block: string) => (
    <Button
      size="micro"
      variant="secondary"
      disclosure
      onClick={() => toggleActive(block)}
    >
      Add To
    </Button>
  );

  const visiblePages = availablePages ?? defaultPages;

  return (
    <BlockStack gap="400">
      <Card>
        <BlockStack gap="300">
          {/* Header */}
          <BlockStack gap="100">
            <Text as="h2" variant="headingMd" fontWeight="bold">
              Block Status
            </Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              Enable or disable the block in your theme editor to show or hide it
              from your store.
            </Text>
          </BlockStack>

          <Divider />

          {/* Blocks */}
          <BlockStack gap="200">
            {Object.entries(allBlocks).map(([block, pages]) => (
              <InlineStack
                key={block}
                align="space-between"
                blockAlign="center"
                gap="200"
              >
                {/* Block name */}
                <InlineStack gap="100" blockAlign="center">
                  <Icon source={AppExtensionIcon} />
                  <Text as="span" variant="bodyMd" fontWeight="medium">
                    {blockLabelMap[block] ?? block}
                  </Text>
                </InlineStack>

                {/* Pages + Add To */}
                <InlineStack gap="200" blockAlign="center">
                  {/* Pills */}
                  <InlineStack gap="100">
                    {Object.entries(pages)
                      .filter(([page]) => visiblePages.includes(page))
                      .map(([page, enabled]) => (
                        <div
                          key={`${block}-${page}`}
                          style={{
                            padding: "2px 6px",
                            borderRadius: "12px",
                            border: "1px solid #C9CCCF",
                            backgroundColor: enabled ? "#F0FFF4" : "#F9FAFB",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: enabled ? "#2E7D32" : "#8C9196",
                              display: "inline-block",
                              flexShrink: 0,
                            }}
                          />
                          <Text as="span" variant="bodySm">
                            {pageLabelMap[page] ?? page}
                          </Text>
                        </div>
                      ))}
                  </InlineStack>

                  {/* Add To */}
                  <Popover
                    active={activeBlock === block}
                    activator={renderActivator(block)}
                    autofocusTarget="first-node"
                    onClose={() => setActiveBlock(null)}
                  >
                    <ActionList
                      actionRole="menuitem"
                      items={visiblePages.map((page) => ({
                        prefix: <Icon source={iconMap(page)} />,
                        content: pageLabelMap[page] ?? page,
                        onAction: () => {
                          const url =
                            getEmbedURLs(themeStoreId)?.[block]?.[page];
                          if (url) window.open(url, "_blank");
                        },
                      }))}
                    />
                  </Popover>
                </InlineStack>
              </InlineStack>
            ))}
          </BlockStack>
        </BlockStack>
      </Card>

      {/* Help section */}
      {/* Help section */}
      <BlockStack gap="200" inlineAlign="center">
        <Divider />

        <Text as="h3" variant="headingSm" fontWeight="bold">
          Need help?
        </Text>

        <InlineStack gap="300" align="center">
          {/* Chat with us — серый, без подчёркивания */}
          <Link
            url="https://your-chat-url.com"
            removeUnderline
            monochrome
          >
            <InlineStack gap="100" blockAlign="center">
              <Icon source={ChatIcon} tone="subdued" />
              <Text as="span" variant="bodyMd" tone="subdued">
                Chat with us
              </Text>
            </InlineStack>
          </Link>

          {/* Visit help page — серый, С подчёркиванием */}
          <Link
            url="https://your-help-page.com"
            monochrome
          >
            <InlineStack gap="100" blockAlign="center">
              <Icon source={ExternalIcon} tone="subdued" />
              <Text as="span" variant="bodyMd" tone="subdued">
                Visit help page
              </Text>
            </InlineStack>
          </Link>
        </InlineStack>

        <Text as="p" variant="bodyMd" tone="subdued" alignment="center">
          Get instant support through chat or browse our comprehensive help
          documentation
        </Text>
      </BlockStack>

    </BlockStack>
  );
};
