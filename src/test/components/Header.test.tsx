import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Header } from "@/components/Header/Header";

// Wrapper component to provide router context
const HeaderWithRouter = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

describe("Header Component", () => {
  describe("Rendering", () => {
    it("should render the header component", () => {
      render(<HeaderWithRouter />);
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("should render the logo image", () => {
      render(<HeaderWithRouter />);
      const logo = screen.getByAltText("App Logo");
      expect(logo).toBeInTheDocument();
    });

    it("should render logo as a link to home", () => {
      render(<HeaderWithRouter />);
      const logoLink = screen.getByAltText("App Logo").closest("a");
      expect(logoLink).toHaveAttribute("href", "/");
    });

    it("should render navigation items as links", () => {
      render(<HeaderWithRouter />);
      const homeLink = screen.getByText("Home").closest("a");
      const moviesLink = screen.getByText("Movies").closest("a");
      const seriesLink = screen.getByText("Series").closest("a");
      const kidsLink = screen.getByText("Kids").closest("a");

      expect(homeLink).toHaveAttribute("href", "/home");
      expect(moviesLink).toHaveAttribute("href", "/movies");
      expect(seriesLink).toHaveAttribute("href", "/series");
      expect(kidsLink).toHaveAttribute("href", "/kids");
    });
  });

  describe("Navigation structure", () => {
    it("should render navigation items in correct order", () => {
      render(<HeaderWithRouter />);
      const links = screen.getAllByRole("link");

      // First link is logo (to "/")
      expect(links[0]).toHaveAttribute("href", "/");

      // Remaining links are nav items
      expect(links[1]).toHaveTextContent("Home");
      expect(links[2]).toHaveTextContent("Movies");
      expect(links[3]).toHaveTextContent("Series");
      expect(links[4]).toHaveTextContent("Kids");
    });

    it("should have total of 5 links (1 logo + 4 nav items)", () => {
      render(<HeaderWithRouter />);
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(5);
    });
  });

  describe("Accessibility", () => {
    it("should have navigation landmark", () => {
      render(<HeaderWithRouter />);
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("should have descriptive alt text for logo", () => {
      render(<HeaderWithRouter />);
      const logo = screen.getByAltText("App Logo");
      expect(logo).toHaveAttribute("alt", "App Logo");
    });

    it("should render links with accessible text", () => {
      render(<HeaderWithRouter />);
      const homeLink = screen.getByRole("link", { name: "Home" });
      const moviesLink = screen.getByRole("link", { name: "Movies" });
      const seriesLink = screen.getByRole("link", { name: "Series" });
      const kidsLink = screen.getByRole("link", { name: "Kids" });

      expect(homeLink).toBeInTheDocument();
      expect(moviesLink).toBeInTheDocument();
      expect(seriesLink).toBeInTheDocument();
      expect(kidsLink).toBeInTheDocument();
    });
  });
});
