import React, { useState, useCallback } from 'react';
import {
  Card,
  BlockStack,
  InlineStack,
  Text,
  Collapsible,
  TextContainer,
  Divider,
  Icon,
} from '@shopify/polaris';
import { ChevronDownIcon } from '@shopify/polaris-icons';
import { t } from 'i18next';
import { sendEvent } from '../../../../utils/sendEvent';

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
    setOpenIdx((prev) => (prev === index ? null : index));
  }, []);

  //reduce dry
  const handleInteraction = (index: number) => {
  handleToggle(index);
  sendEvent('faq_question_click', { question: faqs[index].question });
};


  return (
    <BlockStack gap="400">
      <Text as="h2" variant="headingLg" fontWeight="bold">
        {t('FAQ.faq')}
      </Text>
      <Text as="p">{t('FAQ.quick')}</Text>
      <Card>
        <BlockStack gap="200">
          {faqs.map((faq, index) => (
            <div key={index}>
              {/* Clickable area */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  handleInteraction(index);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleInteraction(index);
                  }
                }}
                aria-expanded={index === openIdx}
                aria-controls={`faq-${index}`}
                className="cursor-pointer py-2 w-full outline-none"
              >
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h3" variant="headingMd" fontWeight="semibold">
                    {faq.question}
                  </Text>
                  <span
                    data-testid={`faq-chevron-${index}`}
                    className={`inline-block transition-transform duration-300 ${
                    index === openIdx ? 'rotate-180' : ''
                  }`}
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

export default FaqWidget;
