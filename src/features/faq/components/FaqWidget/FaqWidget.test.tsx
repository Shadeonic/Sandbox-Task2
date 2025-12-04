import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { FaqWidget } from "./FaqWidget";

describe("FaqWidget", () => {
  const faqs = [
    { question: "Q1", answer: <p>A1</p> },
    { question: "Q2", answer: <p>A2</p> },
  ];

  it("renders all questions", () => {
    render(<FaqWidget faqs={faqs} />);
    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.getByText("Q2")).toBeInTheDocument();
  });

  it("toggles answer visibility", () => {
    render(<FaqWidget faqs={faqs} />);
    fireEvent.click(screen.getByText("Q1"));
    expect(screen.getByText("A1")).toBeVisible();
  });
});
