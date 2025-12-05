import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFaq } from "./useFaq";

describe("useFaq hook", () => {
  it("is defined", () => {
    expect(useFaq).toBeDefined();
  });

  it("returns initial state with no open index", () => {
    const { result } = renderHook(() => useFaq());
    expect(result.current.openIndex).toBeNull();
  });

  it("opens a FAQ when toggled", () => {
    const { result } = renderHook(() => useFaq());
    act(() => {
      result.current.toggle(0);
    });
    expect(result.current.openIndex).toBe(0);
  });

  it("closes the FAQ when toggled again", () => {
    const { result } = renderHook(() => useFaq());
    act(() => {
      result.current.toggle(0); // open
      result.current.toggle(0); // close
    });
    expect(result.current.openIndex).toBeNull();
  });

  it("switches to another FAQ when a different index is toggled", () => {
    const { result } = renderHook(() => useFaq());
    act(() => {
      result.current.toggle(0);
    });
    expect(result.current.openIndex).toBe(0);

    act(() => {
      result.current.toggle(1);
    });
    expect(result.current.openIndex).toBe(1);
  });
});
