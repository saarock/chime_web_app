import { render, screen } from "@testing-library/react";
import Input from "./Input";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { Variant } from "../../types";

describe("Input test", () => {
  it("should render with the give placeholder", () => {
    render(
      <Input type="text" placeholder="Enter name..." onChange={() => {}} id=""/>,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveProperty("placeholder", "Enter name...");
  });

  it("should render the primary input by default", () => {
    render(
      <Input type="text" id="" placeholder="Enter name..." onChange={() => {}} />,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("chime-input-primary");
  });

  it("should render the secondary input text box", () => {
    render(
      <Input
        type="text"
        placeholder="Enter name..."
        onChange={() => {}}
        id=""
        variant={Variant.secondary}
      />,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("chime-input-secondary");
  });

  it("should render the ternary input text box", () => {
    render(
      <Input
        type="text"
        placeholder="Enter name..."
        onChange={() => {}}
        variant={Variant.ternary}
        id=""
      />,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("chime-input-ternary");
  });

  it("should render the input with type number", () => {
    render(
      <Input
        type="number"
        placeholder="Enter name..."
        onChange={() => {}}
        variant={Variant.secondary}
        id=""
      />,
    );
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveProperty("type", "number");
  });
});
