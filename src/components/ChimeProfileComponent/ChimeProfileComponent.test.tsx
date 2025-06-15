import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";

// ✅ Mock BEFORE importing the module that uses it
vi.mock("../../hooks", () => ({
    useAuth: vi.fn(),
}));

// ✅ Mock the loading component
vi.mock("../LoadingComponent/LoadingComponent", () => ({
    default: () => <div>Loading...</div>,
}));

// ✅ Import AFTER mocking
import { useAuth } from "../../hooks";
import ChimeProfileComponent from "./ChimeProfileComponent";

describe("This test helps to test the chimeProfile component", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders loading state", () => {
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            user: null,
            isAuthenticated: false,
            isLoading: true,
        });

        render(<ChimeProfileComponent />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("render user profile when authenticated", () => {
        const mockuser = {
            profilePicture: "https://test.com/image.jpg",
            fullName: "John Doe",
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
            isLoading: false
        });
        render(<ChimeProfileComponent />);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Active")).toBeInTheDocument();
        expect(screen.getByText("john@example.com")).toBeInTheDocument();
        expect(screen.getByText("1234567890")).toBeInTheDocument();
        expect(screen.getByText("Admin")).toBeInTheDocument();
    });


    it("renders empty container when not authenticated and not loading", () => {
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });

        const { container } = render(<ChimeProfileComponent />);
        const element = container.querySelector(".chime-profile-section");
        expect(element).toBeInTheDocument();
    });


});
