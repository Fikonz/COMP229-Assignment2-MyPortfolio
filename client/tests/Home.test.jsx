import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import Home from "../src/pages/Home";

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome to my portfolio/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
