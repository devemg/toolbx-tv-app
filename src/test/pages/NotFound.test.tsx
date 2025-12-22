import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { NotFoundPage } from "@/pages/NotFound/NotFound";

const NotFoundWithRouter = () => (
  <BrowserRouter>
    <NotFoundPage />
  </BrowserRouter>
);

describe("NotFoundPage Component", () => {
  it("should render the 404 image", () => {
    render(<NotFoundWithRouter />);
    const image = screen.getByAltText("404 Page Not Found");
    expect(image).toBeInTheDocument();
  });

  it("should render the error message", () => {
    render(<NotFoundWithRouter />);
    expect(
      screen.getByText("Oh no! The page you are looking for does not exist.")
    ).toBeInTheDocument();
  });

  it("should render a button to go to home page", () => {
    render(<NotFoundWithRouter />);
    const button = screen.getByRole("button", { name: "Go to Home Page" });
    expect(button).toBeInTheDocument();
  });

  it("should have a link to home page", () => {
    render(<NotFoundWithRouter />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
