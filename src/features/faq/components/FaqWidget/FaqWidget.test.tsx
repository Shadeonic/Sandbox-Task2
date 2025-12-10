import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '@shopify/polaris';
import { FaqWidget } from './FaqWidget';
import type { FaqItem } from './FaqWidget';

function renderWithPolaris(ui: React.ReactElement) {
  return render(<AppProvider i18n={{}}>{ui}</AppProvider>);
}

const faqs: FaqItem[] = [
  {
    question: 'How do I enable the App Embed?',
    answer: <p>Enable it in Shopify admin.</p>,
  },
  {
    question: 'Can I use the app with PageFly?',
    answer: <p>Yes, it works with PageFly.</p>,
  },
];

describe('FaqWidget', () => {
  it('renders all FAQ questions', () => {
    renderWithPolaris(<FaqWidget faqs={faqs} />);
    expect(
      screen.getByText('How do I enable the App Embed?')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Can I use the app with PageFly?')
    ).toBeInTheDocument();
  });

  it('toggles answer visibility when a question is clicked', () => {
    renderWithPolaris(<FaqWidget faqs={faqs} />);
    const firstQuestion = screen.getByText('How do I enable the App Embed?');
    const answerContainer = document.getElementById('faq-0');

    // Initially collapsed
    expect(answerContainer).toHaveAttribute('aria-hidden', 'true');
    // don't use .not.toBeVisible() here, jsdom still sees it as visible

    fireEvent.click(firstQuestion);
    expect(answerContainer).toHaveAttribute('aria-hidden', 'false');
    expect(answerContainer).toBeVisible();

    fireEvent.click(firstQuestion);
    expect(answerContainer).toHaveAttribute('aria-hidden', 'true');
    // again rely on aria-hidden for collapsed state
  });

  it('only allows one FAQ open at a time', () => {
    renderWithPolaris(<FaqWidget faqs={faqs} />);
    const firstQuestion = screen.getByText('How do I enable the App Embed?');
    const secondQuestion = screen.getByText('Can I use the app with PageFly?');
    const firstAnswerContainer = document.getElementById('faq-0');
    const secondAnswerContainer = document.getElementById('faq-1');

    fireEvent.click(firstQuestion);
    expect(firstAnswerContainer).toHaveAttribute('aria-hidden', 'false');

    fireEvent.click(secondQuestion);
    expect(secondAnswerContainer).toHaveAttribute('aria-hidden', 'false');
    expect(firstAnswerContainer).toHaveAttribute('aria-hidden', 'true');
  });

  it('rotates chevron when open', () => {
    renderWithPolaris(<FaqWidget faqs={faqs} />);
    const firstQuestion = screen.getByText('How do I enable the App Embed?');
    const chevron = screen.getByTestId('faq-chevron-0');

    // Initially not rotated
    expect(chevron).toHaveStyle('transform: rotate(0deg)');

    fireEvent.click(firstQuestion);

    // After expansion rotated
    expect(chevron).toHaveStyle('transform: rotate(180deg)');
  });
});
