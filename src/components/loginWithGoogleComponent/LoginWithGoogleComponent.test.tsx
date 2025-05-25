import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginWithGoogleComponent from "./LoginWithGoogleComponent";
import { Provider } from "react-redux";
import store from "../../apps/store";
import * as redux from "react-redux";

// Mock GoogleLogin component properly to trigger onSuccess
vi.mock("@react-oauth/google", () => ({
  GoogleLogin: ({ onSuccess }: any) => (
    <button
      onClick={() =>
        onSuccess({ credential: "test-credential", clientId: "test-client-id" })
      }
    >
      Google Login Button
    </button>
  ),
}));

// Mock toast
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Mock apps
import * as apps from "../../apps";

vi.mock("../../apps", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof apps; // Type assertion
  return {
    ...actual, // Now safe to spread
    userReducer: vi.fn(() => ({
      isAuthenticated: true,
      userData: {
        _id: 123,
        email: "test@gmail.com",
      },
    })),
    serverLoginWithGoogle: vi.fn(
      () => () => Promise.resolve({ unwrap: () => Promise.resolve() }),
    ),
  };
});

describe("<LoginWithGoogleComponent />", () => {
  const mockDispatch = vi.fn((thunk) => thunk());

  // Mock the useDispatch hook to return mockDispatch globally
  vi.spyOn(redux, "useDispatch").mockReturnValue(mockDispatch);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Google Login button", () => {
    render(
      <Provider store={store}>
        <LoginWithGoogleComponent />
      </Provider>,
    );

    expect(screen.getByText("Google Login Button")).toBeInTheDocument();
  });

  // it('shows alert if credentials are missing', async () => {
  //     // Override alert function
  //     const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => { });

  //     render(
  //         <Provider store={store}>
  //             <LoginWithGoogleComponent />
  //         </Provider>
  //     );

  //     // Simulate clicking the login button with empty credentials
  //     fireEvent.click(screen.getByText('Google Login Button'));

  //     expect(alertMock).toHaveBeenCalledWith('No credentials found');

  //     alertMock.mockRestore();
  // });
});
