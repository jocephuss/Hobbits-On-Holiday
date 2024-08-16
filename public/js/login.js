document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM to load before running JavaScript
  const loginForm = document.querySelector("#login-form");

  if (loginForm) {
    // Check if the login form exists
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission

      const username = document.querySelector("#username-login").value.trim();
      const password = document.querySelector("#password-login").value.trim();

      if (username && password) {
        // Check if both username and password are provided
        const response = await fetch("/api/users/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        });
        // Check if the response is OK

        if (response.ok) {
          document.location.replace("/character"); // Redirect to character creation page
        } else {
          alert("Failed to log in");
        }
      }
    });
  }
});
