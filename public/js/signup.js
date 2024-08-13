const signupFormHandler = async (event) => {
  event.preventDefault();

  const newUsername = document.querySelector("#username-signup").value.trim();
  const newPassword = document.querySelector("#password-signup").value.trim();

  if (newUsername && newPassword) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ newPassword, newPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      alert("Failed to sign up");
    } else {
      document.location.replace("/character"); // Redirect to character creation page
      return newPassword, newUsername;
    }
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
