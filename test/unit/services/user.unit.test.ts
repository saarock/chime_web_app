import { describe, it, expect, vi, afterEach } from "vitest";
import { userService } from "../../../src/services";
import { UserEndPoint } from "../../../src/apis";
import { errorhandler } from "../../../src/utils";
import { UserImpDetails } from "../../../src/types";

vi.mock("../../../src/apis", () => ({
  UserEndPoint: {
    addUserImportantData: vi.fn(),
    report: vi.fn(),
  },
}));

vi.mock("../../../src/utils", () => ({
  errorhandler: vi.fn((e) => e),
}));

describe("UserService - addUserImportantData", () => {
  const mockImportantDetails: UserImpDetails = {
    age: 25,
    country: "Nepal",
    gender: "Male",
    phoneNumber: "9812345678",
    relationshipStatus: "Single",
    userName: "aayush123",
  };

  const mockResponse = {
    data: mockImportantDetails,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully add user important details", async () => {
    (UserEndPoint.addUserImportantData as any).mockResolvedValue(mockResponse);

    const result = await userService.addUserImportantData(mockImportantDetails);
    expect(UserEndPoint.addUserImportantData).toHaveBeenCalledWith(mockImportantDetails);
    expect(result).toEqual(mockImportantDetails);
  });

  it("should handle error if adding user important details fails", async () => {
    const error = new Error("Failed to save user data");
    (UserEndPoint.addUserImportantData as any).mockRejectedValue(error);
    (errorhandler as any).mockImplementation((e: Error) => new Error("Handled: " + e.message));

    await expect(userService.addUserImportantData(mockImportantDetails)).rejects.toThrow("Handled: Failed to save user data");
    expect(errorhandler).toHaveBeenCalledWith(error);
  });
});
