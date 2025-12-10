/// <reference types="react" />

declare namespace JSX {
  interface IntrinsicElements {
    's-switch': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      label?: string;
      checked?: boolean;
      defaultChecked?: boolean;
      disabled?: boolean;
      details?: string;
      error?: string;
      id?: string;
      name?: string;
      required?: boolean;
      value?: string;
      accessibilityLabel?: string;
      labelAccessibilityVisibility?: 'visible' | 'exclusive';
      onChange?: (event: Event) => void;
    };
  }
}
