import { render, screen } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { Variant } from "../../types";

describe("Button component", () => {
  it("renders with the given text", () => {
    render(<Button text="Click Me" onClick={() => { }} />);
    expect(screen.getByRole("button", { name: "Click Me" })).toBeDefined();
  });

  it("applies primary variant class by default ", () => {
    render(<Button text="Primary" onClick={() => { }} />);
    const button = screen.getByRole("button", { name: "Primary" });
    expect(button).toHaveClass("chime-btn-primary");
  });

  it("applies secondary ", () => {
    render(
      <Button
        text="Secondary"
        onClick={() => { }}
        variant={Variant.secondary}
      />,
    );
    const button = screen.getByRole("button", { name: "Secondary" });
    expect(button).toHaveClass("chime-btn-secondary");
  });
  it("applies secondary ", () => {
    render(
      <Button text="Ternary" onClick={() => { }} variant={Variant.ternary} />,
    );
    const button = screen.getByRole("button", { name: "Ternary" });
    expect(button).toHaveClass("chime-btn-ternary");
  });

  it("applies secondary ", () => {
    render(
      <Button
        type="submit"
        text="Submit"
        onClick={() => { }}
        variant={Variant.secondary}
      />,
    );
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toHaveAttribute("type", "submit");
  });
});
