const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
    console.log("test");
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("fetch function");

    if (response.ok) {
      document.location.replace("/character"); // Redirect to character creation page
    } else {
      alert("Failed to sign up");
    }
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
