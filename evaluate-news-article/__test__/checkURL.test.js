import { checkURL } from "../src/client/js/checkURL";
describe("Testing URL validation functionality", () => {
  test("It should return true for a valid URL", () => {
    expect(checkURL("https://example.com")).toBe(true);
  });

  test("It should return false for an invalid URL", () => {
    expect(checkURL("invalid-url")).toBe(false);
  });
});
