import { describe, it, expect, vi, afterEach } from "vitest";
import { AuthService } from "../../../src/services/index";
import { AuthEndPoint } from "../../../src/apis";
import { errorhandler } from "../../../src/utils";
import { refreshTokens } from "../../../src/manager";

// ✅ Correct Mock: mock from the same path used in the actual import
vi.mock("../../../src/apis", () => ({
    AuthEndPoint: {
        login: vi.fn(),
        verifyTokenAndGetUserData: vi.fn(),
        refreshTokens: vi.fn(),
    }
}));

vi.mock("../../../src/utils", () => ({
    errorhandler: vi.fn((e) => e),
}));

describe("AuthService", () => {
    const mockUserDetails = {
        clientId: "mock-clientId",
        credential: "test-credential",
    };

    const mockResponse = {
        data: {
            accessToken: "abc123",
            refreshToken: "fake-refresh-token",
            user: {
                id: "user123",
                email: "test@example.com",
            },
        },
    };

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should login with Google and return auth data", async () => {
        (AuthEndPoint.login as any).mockResolvedValue(mockResponse);

        const result = await AuthService.loginWithGoogle(mockUserDetails);

        expect(AuthEndPoint.login).toHaveBeenCalledWith(mockUserDetails);
        expect(result).toEqual(mockResponse.data);
    });

    it("should handle login error with errorhandler", async () => {
        const mockError = new Error("Login failed");
        (AuthEndPoint.login as any).mockRejectedValue(mockError);
        (errorhandler as any).mockImplementation((e: Error) => new Error("Handled: " + e.message));

        await expect(AuthService.loginWithGoogle(mockUserDetails)).rejects.toThrow("Handled: Login failed");
        expect(errorhandler).toHaveBeenCalledWith(mockError);
    });

    it("should verify token and return user data", async () => {
        (AuthEndPoint.verifyTokenAndGetUserData as any).mockResolvedValue(mockResponse);

        const result = await AuthService.verifyTokenOnEveryPageAndGetUserData();

        expect(AuthEndPoint.verifyTokenAndGetUserData).toHaveBeenCalled();
        expect(result).toEqual(mockResponse.data);
    });

    it("should handle token verification error with errorhandler", async () => {
        const mockError = new Error("Token verification failed");
        (AuthEndPoint.verifyTokenAndGetUserData as any).mockRejectedValue(mockError);
        (errorhandler as any).mockImplementation((e: Error) => new Error("Handled: " + e.message));

        await expect(AuthService.verifyTokenOnEveryPageAndGetUserData()).rejects.toThrow("Handled: Token verification failed");
        expect(errorhandler).toHaveBeenCalledWith(mockError);
    });

    it("should refresh the tokens if the accesstoken get expired", async () => {
        mockResponse.data.accessToken = "fake-access-token";
        mockResponse.data.refreshToken = "fake-refresh-token";
        mockResponse.data.user = null as unknown as typeof mockResponse.data.user;
        ; (AuthEndPoint.refreshTokens as any).mockResolvedValue(mockResponse);
        const result = await AuthService.refreshTokens();
        // Assertions

        expect(result.accessToken).toEqual("fake-access-token");
        expect(result.refreshToken).toEqual("fake-refresh-token");
        expect(result.user).toBeNull();
    });
    it("should return user object from login response", async () => {
        (AuthEndPoint.login as any).mockResolvedValue(mockResponse);
        const result = await AuthService.loginWithGoogle(mockUserDetails);
        expect(result.user).toEqual(mockResponse.data.user);
    });
    it("should return null user if token verification returns null", async () => {
        const response = { data: { ...mockResponse.data, user: null } };
        (AuthEndPoint.verifyTokenAndGetUserData as any).mockResolvedValue(response);
        const result = await AuthService.verifyTokenOnEveryPageAndGetUserData();
        expect(result.user).toBeNull();
    });
    it("should call refreshTokens endpoint once", async () => {
        (AuthEndPoint.refreshTokens as any).mockResolvedValue(mockResponse);
        await AuthService.refreshTokens();
        expect(AuthEndPoint.refreshTokens).toHaveBeenCalledTimes(1);
    });

    it("should handle refresh token error", async () => {
        const mockError = new Error("Refresh token error");
        (AuthEndPoint.refreshTokens as any).mockRejectedValue(mockError);
        (errorhandler as any).mockImplementation((e: Error) => new Error("Handled: " + e.message));

        await expect(AuthService.refreshTokens()).rejects.toThrow("Handled: Refresh token error");
        expect(errorhandler).toHaveBeenCalledWith(mockError);
    });
    it("should logout user successfully", async () => {
        const mockUserId = "user123";
        (AuthEndPoint.logoutUser as any) = vi.fn().mockResolvedValue(undefined);

        await AuthService.logoutUser(mockUserId);
        expect(AuthEndPoint.logoutUser).toHaveBeenCalledWith(mockUserId);
    });
    it("should handle logout error", async () => {
        const mockUserId = "user123";
        const mockError = new Error("Logout failed");

        (AuthEndPoint.logoutUser as any) = vi.fn().mockRejectedValue(mockError);
        (errorhandler as any).mockImplementation((e: Error) => new Error("Handled: " + e.message));

        await expect(AuthService.logoutUser(mockUserId)).rejects.toThrow("Handled: Logout failed");
        expect(errorhandler).toHaveBeenCalledWith(mockError);
    });

    it("should not call errorhandler if refreshTokens succeeds", async () => {
        (AuthEndPoint.refreshTokens as any).mockResolvedValue(mockResponse);
        await AuthService.refreshTokens();
        expect(errorhandler).not.toHaveBeenCalled();
    });

});
