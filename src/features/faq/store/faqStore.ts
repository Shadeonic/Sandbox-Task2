/**
 * Simple placeholder store for FAQ state management.
 *
 * Tracks which FAQ item is currently open and provides
 * a toggle function to open/close a given index.
 *
 * This is a minimal implementation; in a real app you might
 * replace it with Zustand or another state management library.
 *
 * @property state.openIndex - number | null — the index of the currently open FAQ, or null if none
 * @method toggle - (index: number) => void — toggles the given FAQ index open/closed
 *
 * @example
 * faqStore.toggle(0); // opens the first FAQ
 * console.log(faqStore.state.openIndex); // 0
 */
export const faqStore = {
  state: { openIndex: null as number | null },
  toggle(index: number) {
    faqStore.state.openIndex =
      faqStore.state.openIndex === index ? null : index;
  },
};
