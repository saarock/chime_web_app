// test/unit/validation/feedbackSchema.test.ts

import { describe, it, expect } from "vitest";
import { feedbackSchema } from "../../../src/components/FeedBackForm/FeedBackForm";

describe("Feedback Schema Validation", () => {
  it("should pass with valid feedback data", () => {
    const validData = {
      rating: 5,
      category: "Bug Report",
      feedback: "I really love the new features. Keep it up!",
      email: "user@example.com",
      wouldRecommend: true,
      callQuality: 4,
      easeOfUse: 5,
      features: ["Screen Share", "Audio Clarity"],
      improvements: "Add dark mode please.",
      userId: "user123",
    };

    const result = feedbackSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail when required fields are missing", () => {
    const invalidData = {
      rating: 0,
      category: "",
      feedback: "Too short",
      callQuality: 0,
      easeOfUse: 0,
      wouldRecommend: false,
    };

    const result = feedbackSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.format().rating?._errors).toContain("Please select a rating");
      expect(result.error.format().category?._errors).toContain("Please select a category");
      expect(result.error.format().feedback?._errors).toContain("Feedback must be at least 10 characters");
    }
  });

  it("should allow empty email if not provided", () => {
    const data = {
      rating: 4,
      category: "UX",
      feedback: "Very intuitive and smooth",
      email: "",
      wouldRecommend: true,
      callQuality: 5,
      easeOfUse: 4,
    };

    const result = feedbackSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});
