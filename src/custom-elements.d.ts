// src/custom-elements.d.ts
// Minimal, safe typings for Polaris web components used in this project.

import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // s-switch: allows checked prop and emits a CustomEvent<{checked: boolean}>
      "s-switch": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          checked?: boolean;
          onChange?: (e: CustomEvent<{ checked: boolean }>) => void;
          label?: string;
          id?: string;
        },
        HTMLElement
      >;

      "s-popover": any;
      "s-button": any;
      "s-text-field": any;
    }
  }
}

// Ensure this file is treated as a module (prevents global-scope warnings)
export {};
