import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FaqWidget } from "./FaqWidget";
import type { FaqItem } from "./FaqWidget";

// Sample FAQ data for testing
const faqs: FaqItem[] = [
  { question: "How do I enable the App Embed?", answer: <p>Enable it in Shopify admin.</p> },
  { question: "Can I use the app with PageFly?", answer: <p>Yes, it works with PageFly.</p> },
];

describe("FaqWidget", () => {
  it("renders all FAQ questions", () => {
    render(<FaqWidget faqs={faqs} />);
    expect(screen.getByText("How do I enable the App Embed?")).toBeInTheDocument();
    expect(screen.getByText("Can I use the app with PageFly?")).toBeInTheDocument();
  });

  it("toggles answer visibility when a question is clicked", () => {
    render(<FaqWidget faqs={faqs} />);
    const firstQuestion = screen.getByText("How do I enable the App Embed?");
    
    // Initially answer should not be visible
    expect(screen.queryByText("Enable it in Shopify admin.")).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(firstQuestion);
    expect(screen.getByText("Enable it in Shopify admin.")).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(firstQuestion);
    expect(screen.queryByText("Enable it in Shopify admin.")).not.toBeInTheDocument();
  });

  it("only allows one FAQ open at a time", () => {
    render(<FaqWidget faqs={faqs} />);
    const firstQuestion = screen.getByText("How do I enable the App Embed?");
    const secondQuestion = screen.getByText("Can I use the app with PageFly?");

    // Open first
    fireEvent.click(firstQuestion);
    expect(screen.getByText("Enable it in Shopify admin.")).toBeInTheDocument();

    // Open second
    fireEvent.click(secondQuestion);
    expect(screen.getByText("Yes, it works with PageFly.")).toBeInTheDocument();

    // First should now be closed
    expect(screen.queryByText("Enable it in Shopify admin.")).not.toBeInTheDocument();
  });

  it("rotates chevron when open", () => {
    render(<FaqWidget faqs={faqs} />);
    const firstQuestion = screen.getByText("How do I enable the App Embed?");
    const chevron = screen.getByRole("img", { hidden: true }); // lucide-react icons render as <svg role="img">

    // Initially not rotated
    expect(chevron.className).not.toContain("rotate-180");

    // Click to expand
    fireEvent.click(firstQuestion);
    expect(chevron.className).toContain("rotate-180");
  });
});
