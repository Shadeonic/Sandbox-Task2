import { useState } from "react";

/**
 * Hook to manage FAQ open/close state.
 *
 * Tracks which FAQ item is currently expanded and provides
 * a toggle function to open or close a given index.
 *
 * @returns Object with:
 *  - openIndex: number | null — the index of the currently open FAQ, or null if none
 *  - toggle: (index: number) => void — function to toggle a FAQ item open/closed
 *
 * @example
 * const { openIndex, toggle } = useFaq();
 * toggle(0); // opens the first FAQ
 */

export function useFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return { openIndex, toggle };
}

export default useFaq;