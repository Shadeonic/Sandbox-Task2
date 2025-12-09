// src/custom-elements.d.ts
export {}; // keep this file a module

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Minimal typing for s-switch. Adjust/add props as you need.
      's-switch': {
        id?: string;
        label?: string;
        checked?: boolean;
        disabled?: boolean;
        // Events from Polaris web components are CustomEvent-based.
        // React's JSX typing expects functions; use any or the proper CustomEvent type:
        onChange?: (e: CustomEvent<{ checked: boolean }>) => void;
        // allow any other props (data-*, aria-*, class, style etc.)
        [key: string]: any;
      };

      // If you use other Polaris elements, add them here similarly:
      // 's-form': any;
      // 's-popover': any;
    }
  }
}
