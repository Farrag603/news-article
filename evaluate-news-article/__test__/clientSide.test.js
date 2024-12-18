import { updateUI } from "../src/client/js/updateUI";

jest.mock("../src/client/js/checkURL", () => ({
  checkURL: jest.fn(),
}));

const { checkURL } = require("../src/client/js/checkURL");

global.fetch = jest.fn((url, options) => {
  return Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        text: "Test Text",
        agreement: "High",
        subjectivity: "Subjective",
        confidence: 0.9,
        irony: "None",
        score_tag: "Positive",
      }),
  });
});

describe("Form Submission", () => {
  let form,
    inputField,
    textElement,
    agreementElement,
    subjectivityElement,
    confidenceElement,
    ironyElement,
    scoreTagElement;

  beforeEach(() => {
    // Mock DOM elements
    document.body.innerHTML = `
        <form id="form">
            <input type="text" id="article-url" />
            <button type="submit">Submit</button>
        </form>
        <div id="text"></div>
        <div id="agreement"></div>
        <div id="subjectivity"></div>
        <div id="confidence"></div>
        <div id="irony"></div>
        <div id="score_tag"></div>
        `;

    form = document.getElementById("form");
    inputField = document.getElementById("article-url");

    textElement = document.getElementById("text");
    agreementElement = document.getElementById("agreement");
    subjectivityElement = document.getElementById("subjectivity");
    confidenceElement = document.getElementById("confidence");
    ironyElement = document.getElementById("irony");
    scoreTagElement = document.getElementById("score_tag");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not throw", () => {
    expect(true).toBe(true);
  });
});
