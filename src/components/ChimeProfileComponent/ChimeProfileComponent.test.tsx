import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useAuth } from "../../hooks";
import ChimeProfileComponent from "../ChimeProfileComponent/ChimeProfileComponent";
import { JSX } from "react";

// 👇 Mock useAuth
vi.mock("../../hooks", () => ({
  useAuth: vi.fn(),
}));

// 👇 Mock LoadingComponent
vi.mock("../LoadingComponent/LoadingComponent", () => ({
  default: () => <div>Loading...</div>,
}));

// 👇 Mock components that likely use Redux (fixes Provider error)
vi.mock("../ChimeUserInfoModal/ChimeUserInfoModal", () => ({
  default: () => <div>Mock Modal</div>,
}));

vi.mock("../Button/Button", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
}));

// ✅ Create mock Redux store with a no-op reducer
const mockStore = configureStore({
  reducer: () => ({}),
});

describe("This test helps to test the chimeProfile component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProvider = (component: JSX.Element) =>
    render(<Provider store={mockStore}>{component}</Provider>);

  it("renders loading state", () => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: true,
    });

    renderWithProvider(<ChimeProfileComponent />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders user profile when authenticated", () => {
    const mockuser = {
      profilePicture: "https://test.com/image.jpg",
      fullName: "John Doe",
      userName: "johnny",
      active: true,
      email: "john@example.com",
      phoneNumber: "1234567890",
      age: 25,
      gender: "Male",
      country: "USA",
      relationShipStatus: true,
      role: "Admin",
    };

    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      user: mockuser,
      isAuthenticated: true,
      isLoading: false,
    });

    renderWithProvider(<ChimeProfileComponent />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("renders nothing when not authenticated and not loading", () => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    const { container } = renderWithProvider(<ChimeProfileComponent />);
    // ✅ safer assertion for an empty DOM element
    expect(container.innerHTML.trim()).toBe("");
  });
});
