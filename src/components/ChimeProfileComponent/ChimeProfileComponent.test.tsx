import { render} from "@testing-library/react";
import { describe, it } from "vitest";
import ChimeProfileComponent from "./ChimeProfileComponent";

describe("This test helps to test the chimeProfile component", () => {
    it ("should properly render the component", () => {
        render(<ChimeProfileComponent />);
    });
});
