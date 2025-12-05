import React, { useState, useCallback } from "react";
import {
  LegacyCard,
  LegacyStack,
  Collapsible,
  TextContainer,
  InlineStack,
  BlockStack,
  Text,
} from "@shopify/polaris";
import { ChevronDown } from "lucide-react";
import { t } from "i18next";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqWidgetProps {
  faqs: FaqItem[];
}

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
      <LegacyCard sectioned>
        <LegacyStack vertical>
          {faqs.map((faq, index) => (
            <div key={index}>
              <div
                className="w-full hover:underline cursor-pointer"
                onClick={() => {
                  handleToggle(index);
                //   sendEvent("faq_question_click", { question: faq.question });
                }}
              >
                <div className="w-full">
                    <InlineStack align="space-between">
                    <h3 className="font-semibold">{faq.question}</h3>
                    <span
                        className={`transition-transform duration-300 ${
                        index === openIdx ? "rotate-180" : ""
                        }`}
                    >
                        <ChevronDown height={20} />
                    </span>
                    </InlineStack>
                </div>
              </div>
              <Collapsible id={`faq-${index}`} open={index === openIdx}>
                <TextContainer>{faq.answer}</TextContainer>
              </Collapsible>
              {index < faqs.length - 1 && <hr className="mt-2" />}
            </div>
          ))}
        </LegacyStack>
      </LegacyCard>
    </BlockStack>
  );
};