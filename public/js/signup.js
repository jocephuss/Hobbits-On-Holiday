const signupFormHandler = async (event) => {
  // Handle form submission event
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
    // Check if both username and password are provided
    console.log("test");
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    // Log the response status to the console for debugging purposes
    console.log("fetch function");

    if (response.ok) {
      document.location.replace("/character"); // Redirect to character creation page
    } else {
      alert("Failed to sign up");
    }
  }
};
// Add event listener for the signup form submission

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
