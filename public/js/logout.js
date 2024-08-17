const logout = async () => {
  // Fetch the logout endpoint from the API
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }); // Check if the response is OK

  if (response.ok) {
    document.location.replace("/login"); // Redirect to login after logout
  } else {
    alert("Failed to log out");
  }
};
// Add event listener for the logout button

document.querySelector("#logout").addEventListener("click", logout);
