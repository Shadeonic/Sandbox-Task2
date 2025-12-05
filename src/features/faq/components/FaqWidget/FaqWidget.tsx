import React, { useState, useCallback } from "react";
import {
  Card,
  BlockStack,
  InlineStack,
  Text,
  Collapsible,
  TextContainer,
  Divider,
  Icon,
} from "@shopify/polaris";
import { ChevronDownIcon } from "@shopify/polaris-icons";
import { t } from "i18next";
import { sendEvent } from "../../../../utils/sendEvent";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqWidgetProps {
  faqs: FaqItem[];
}

/**
 * FAQWidget component
 *
 * Renders a collapsible list of FAQ items using Polaris components.
 * - Accessible: supports keyboard navigation and screen readers.
 * - Animated chevron: rotates when a section is expanded.
 */
export const FaqWidget: React.FC<FaqWidgetProps> = ({ faqs }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIdx(prev => (prev === index ? null : index));
  }, []);

  return (
    <BlockStack gap="400">
      <Text as="h2" variant="headingLg" fontWeight="bold">
        {t("FAQ.faq")}
      </Text>
      <Text as="p">{t("FAQ.quick")}</Text>
      <Card>
        <BlockStack gap="200">
          {faqs.map((faq, index) => (
            <div key={index}>
              {/* Clickable area */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  handleToggle(index);
                  sendEvent("faq_question_click", { question: faq.question });
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggle(index);
                    sendEvent("faq_question_click", { question: faq.question });
                  }
                }}
                aria-expanded={index === openIdx}
                aria-controls={`faq-${index}`}
                style={{
                  cursor: "pointer",
                  padding: "8px 0",
                  width: "100%",
                  outline: "none",
                }}
              >
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h3" variant="headingMd" fontWeight="semibold">
                    {faq.question}
                  </Text>
                  <span
                    style={{
                      display: "inline-block",
                      transition: "transform 0.3s",
                      transform: index === openIdx ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <Icon source={ChevronDownIcon} tone="base" />
                  </span>
                </InlineStack>
              </div>

              <Collapsible id={`faq-${index}`} open={index === openIdx}>
                <TextContainer>{faq.answer}</TextContainer>
              </Collapsible>

              {index < faqs.length - 1 && <Divider />}
            </div>
          ))}
        </BlockStack>
      </Card>
    </BlockStack>
  );
};
