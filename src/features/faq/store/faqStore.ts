import { useState } from "react";

// simple placeholder store until you add real logic
export const faqStore = {
  state: { openIndex: null as number | null },
  toggle(index: number) {
    faqStore.state.openIndex =
      faqStore.state.openIndex === index ? null : index;
  },
};
