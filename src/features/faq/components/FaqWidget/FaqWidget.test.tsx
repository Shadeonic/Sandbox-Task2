import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '@shopify/polaris';
import { FaqWidget } from './FaqWidget';
import type { FaqItem } from './FaqWidget';
import { vi } from 'vitest';
import { sendEvent } from '../../../../utils/sendEvent';
vi.mock('../../../../utils/sendEvent', () => ({
  sendEvent: vi.fn(),
}));

let utils: ReturnType<typeof render>;

beforeEach(() => {
  utils = renderWithPolaris(<FaqWidget faqs={faqs} />);
});

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
    expect(
      screen.getByText('How do I enable the App Embed?')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Can I use the app with PageFly?')
    ).toBeInTheDocument();
  });

  it('toggles answer visibility when a question is clicked', () => {
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
    const firstQuestion = screen.getByText('How do I enable the App Embed?');
    const chevron = screen.getByTestId('faq-chevron-0');

    // Initially not rotated
    expect(chevron.className).not.toContain('rotate-180');
    fireEvent.click(firstQuestion);
    expect(chevron.className).toContain('rotate-180');

  });

  it('calls sendEvent when a question is clicked', () => {
    const firstQuestion = screen.getByText('How do I enable the App Embed?');

    fireEvent.click(firstQuestion);
    expect(sendEvent).toHaveBeenCalledWith('faq_question_click', {
      question: 'How do I enable the App Embed?',
    });
  });

  it('sets aria-expanded correctly on toggle', () => {
  const toggleButton = screen.getByRole('button', {
    name: /how do i enable the app embed/i,
  });

  expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(toggleButton);
  expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles FAQ with Enter and Space keys', () => {
    const firstQuestion = screen.getByText('How do I enable the App Embed?');

    fireEvent.keyDown(firstQuestion.parentElement!, { key: 'Enter' });
    expect(document.getElementById('faq-0')).toHaveAttribute('aria-hidden', 'false');

    fireEvent.keyDown(firstQuestion.parentElement!, { key: ' ' });
    expect(document.getElementById('faq-0')).toHaveAttribute('aria-hidden', 'true');
  });
});
