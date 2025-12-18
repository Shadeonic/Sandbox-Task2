import { describe, it, expect, beforeEach } from 'vitest';
import { faqStore } from './faqStore';

describe('faqStore', () => {
  beforeEach(() => {
    faqStore.state.openIndex = null;
  });

  it('should be defined', () => {
    expect(faqStore).toBeDefined();
  });

  it('should toggle the selected index', () => {
    expect(faqStore.state.openIndex).toBe(null);

    faqStore.toggle(1);
    expect(faqStore.state.openIndex).toBe(1);

    faqStore.toggle(1);
    expect(faqStore.state.openIndex).toBe(null);
  });

  it('should close previous and open new index', () => {
    faqStore.toggle(0);
    expect(faqStore.state.openIndex).toBe(0);

    faqStore.toggle(2);
    expect(faqStore.state.openIndex).toBe(2);
  });
});
