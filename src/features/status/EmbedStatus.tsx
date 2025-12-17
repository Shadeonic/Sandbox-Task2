import {
  ActionList,
  Badge,
  BlockStack,
  Button,
  Card,
  Divider,
  Icon,
  InlineStack,
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
} from "@shopify/polaris-icons";
import { t } from "i18next";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";
// import { getEmbedURLs } from "libautech-frontend";

import { getEmbedURLs } from "@/lib/getEmbedURLs";

// Types
type PageMap = Record<string, boolean>;
type AllBlocks = Record<string, PageMap>;

interface EmbedStatusProps {
  allBlocks: AllBlocks;
  themeStoreId: string;
  availablePages?: string[];
}

const defaultPages = ["index", "product", "cart", "collection", "collectionList"];

interface PageOption {
  label: string;
  value: string;
}

// Helpers
const addToPages = (pages: string[] = defaultPages): PageOption[] => {
  return pages.map((page) => ({
    label: t(`Ext.pages.${page}`),
    value: page,
  }));
};

const iconMap = (page: string): IconSource => {
  switch (page) {
    case "index":
      return HomeIcon;
    case "product":
      return ProductIcon;
    case "cart":
      return CartIcon;
    case "collectionList":
      return CollectionListIcon;
    case "collection":
      return CollectionFeaturedIcon;
    default:
      return AppExtensionIcon;
  }
};

// Component
export const EmbedStatus: React.FC<EmbedStatusProps> = ({ allBlocks, themeStoreId, availablePages }) => {
  const shopify = useAppBridge();
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  const toggleActive = useCallback((block: string) => {
    setActiveBlock((prev) => (prev === block ? null : block));
}, []);

  const renderActivator = (block: string) => (
  <Button
    onClick={() => toggleActive(block)}
    disclosure
    size="micro"
  >
    {t("Ext.addTo")}
  </Button>
);

  return (
    <Card>
      <BlockStack gap="200">
        <BlockStack gap="100">
          <Text as="h2" variant="headingMd" fontWeight="bold">
            {t("Ext.extensionStatus")}
          </Text>
          <Text as="p" variant="bodyMd">
            {t("Ext.extensionStatusDescription")}
          </Text>
        </BlockStack>
        <Divider />
        <BlockStack gap="200">
          {Object.entries(allBlocks).map(([block, pages]) => (
            <div key={block} className="flex items-center gap-2 justify-between">
              <InlineStack gap="100" blockAlign="center" align="start">
                <span>
                  <Icon source={AppExtensionIcon} />
                </span>
                <Text as="p" variant="bodyMd" fontWeight="medium">
                  {t(`Ext.blocks.${block}`)}
                </Text>
              </InlineStack>

              <InlineStack gap="200">
                <InlineStack gap="100" blockAlign="center" align="end">
                  {Object.entries(pages).map(([page, enabled]) => (
                    <Badge
                      key={`${block}-${page}`}
                      tone={enabled ? "success" : undefined}
                      progress={enabled ? "complete" : "incomplete"}
                    >
                      {t(`Ext.pages.${page}`)}
                    </Badge>
                  ))}
                </InlineStack>

                <div className="flex items-center justify-end">
                  <Popover
                    active={activeBlock === block}
                    activator={renderActivator(block)}
                    autofocusTarget="first-node"
                    onClose={() => setActiveBlock(null)}
                  >
                    <ActionList
                      actionRole="menuitem"
                      items={addToPages(availablePages ?? defaultPages).map((page) => ({
                        prefix: <Icon source={iconMap(page.value)} />,
                        content: page.label,
                        onAction: () => {
                          const url = getEmbedURLs(themeStoreId)?.[block]?.[page.value];
                          if (url) window.open(url, "_blank");
                        },
                      }))}
                    />
                  </Popover>
                </div>
              </InlineStack>
            </div>
          ))}
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
