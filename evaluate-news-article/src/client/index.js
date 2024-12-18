import "./styles/style.scss";
import { checkURL } from "./js/checkURL";
import { updateUI } from "./js/updateUI";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const errorDiv = document.getElementById("error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputField = document.getElementById("article-url");
    const url = inputField.value.trim(); // Trim leading/trailing spaces

    // Clear any previous error message
    errorDiv.textContent = "";

    // Validate URL
    if (url === "") {
      errorDiv.textContent = "Please enter a URL.";
      return;
    }

    if (!checkURL(url)) {
      errorDiv.textContent = "Invalid URL! Please enter a valid URL.";
      return;
    }

    try {
      // Disable submit button to prevent multiple submissions
      const submitButton = document.querySelector('button[type="submit"]');
      submitButton.disabled = true;

      // Show loading message
      errorDiv.textContent = "Loading...";

      // Send URL to the server
      const response = await fetch("http://localhost:8081/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server.");
      }

      const data = await response.json();

      // Update UI with API response
      updateUI(data);
    } catch (error) {
      errorDiv.textContent = "Error: Unable to fetch data from the server.";
      console.error(error);
    } finally {
      // Re-enable submit button and hide loading message
      submitButton.disabled = false;
    }
  });
});
