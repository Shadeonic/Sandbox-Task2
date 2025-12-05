import React from "react";
import { FaqWidget } from "./FaqWidget";
import type { FaqItem } from "./FaqWidget";
import { TextContainer, List, Text } from "@shopify/polaris";
import { t } from "i18next";

/**
 * Example wrapper for the FaqWidget component.
 *
 * Provides sample FAQ data (localized via i18next) and renders
 * the FaqWidget for demonstration purposes in the sandbox.
 *
 * @returns JSX.Element - A rendered FAQ widget with example questions/answers
 *
 * @example
 * <FaqWidgetExample />
 */

export const FaqWidgetExample: React.FC = () => {
  const faqs: FaqItem[] = [
    {
      question: t("FAQ.q1"),
      answer: (
        <TextContainer>
          <p className="mb-1">{t("FAQ.1.0")}</p>
          <List type="bullet">
            <List.Item>{t("FAQ.1.1")}</List.Item>
            <List.Item>{t("FAQ.1.2")}</List.Item>
            <List.Item>{t("FAQ.1.3")}</List.Item>
            <List.Item>{t("FAQ.1.4")}</List.Item>
            <List.Item>{t("FAQ.1.5")}</List.Item>
          </List>
          <Text as="p" variant="bodyMd">
            {t("FAQ.2.8")}{" "}
            <a
              className="underline text-blue-600"
              href="https://libautech.crisp.help/en/article/how-to-enable-the-app-embed-1bdu9r3/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("FAQ.1.6")}
            </a>
          </Text>
        </TextContainer>
      ),
    },
    {
      question: t("FAQ.q2"),
      answer: (
        <TextContainer>
          <p className="mb-1">{t("FAQ.2.1")}</p>
          <List type="bullet">
            <List.Item>{t("FAQ.2.2")}</List.Item>
            <List.Item>{t("FAQ.2.3")}</List.Item>
            <List.Item>{t("FAQ.2.4")}</List.Item>
            <List.Item>{t("FAQ.2.5")}</List.Item>
            <List.Item>
              <span className="font-bold">{t("FAQ.2.6.0")}</span>
              {t("FAQ.2.6")}
            </List.Item>
          </List>
          <Text as="p" variant="bodyMd">
            {t("FAQ.2.8")}{" "}
            <a
              className="underline text-blue-600"
              href="https://libautech.crisp.help/en/article/my-offer-isnt-showing-up-what-should-i-do-1k3l1hn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("FAQ.2.9")}
            </a>
          </Text>
        </TextContainer>
      ),
    },
    {
      question: t("FAQ.q3"),
      answer: (
        <TextContainer>
          <p className="mb-1">{t("FAQ.3.1")}</p>
          <List type="bullet">
            <List.Item>{t("FAQ.3.2")}</List.Item>
          </List>
          <p className="mb-1">{t("FAQ.3.3")}</p>
          <List type="bullet">
            <List.Item>{t("FAQ.3.4")}</List.Item>
          </List>
          <Text as="p" variant="bodyMd">
            {t("FAQ.2.8")}{" "}
            <a
              className="underline text-blue-600"
              href="https://libautech.crisp.help/en/article/how-do-i-reposition-the-widget-1j3p3zm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("FAQ.3.5")}
            </a>
          </Text>
        </TextContainer>
      ),
    },
    {
      question: t("FAQ.q4"),
      answer: (
        <TextContainer>
          <List type="bullet">
            <List.Item>{t("FAQ.4.1")}</List.Item>
            <List.Item>{t("FAQ.4.2")}</List.Item>
            <List.Item>{t("FAQ.4.3")}</List.Item>
            <List.Item>{t("FAQ.4.4")}</List.Item>
          </List>
        </TextContainer>
      ),
    },
    {
      question: t("FAQ.q5"),
      answer: (
        <TextContainer>
          <p className="mb-1">{t("FAQ.5.1")}</p>
          <List type="bullet">
            <List.Item>{t("FAQ.5.2")}</List.Item>
            <List.Item>{t("FAQ.5.3")}</List.Item>
            <List.Item>{t("FAQ.5.4")}</List.Item>
          </List>
        </TextContainer>
      ),
    },
    {
      question: t("FAQ.q6"),
      answer: (
        <TextContainer>
          <p className="mb-1">{t("FAQ.6.1")}</p>
          <List type="bullet">
            <List.Item>{t("FAQ.6.2")}</List.Item>
            <List.Item>
              {t("FAQ.6.3")}{" "}
              <a
                className="underline text-blue-600"
                href="https://libautech.crisp.help/en/article/how-do-i-reposition-the-widget-1j3p3zm/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("FAQ.3.5")}
              </a>
            </List.Item>
          </List>
          <div className="mb-1">
            {t("FAQ.2.8")}{" "}
            <a
              className="underline text-blue-600"
              href="https://libautech.crisp.help/en/article/can-i-use-the-app-with-theme-builders-pagefly-gempages-shogun-1yczadx/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("FAQ.6.7")}
            </a>
          </div>
          <Text as="p" variant="bodyMd">
            {t("FAQ.6.4")}
          </Text>
        </TextContainer>
      ),
    },
  ];

  return <FaqWidget faqs={faqs} />;
};
