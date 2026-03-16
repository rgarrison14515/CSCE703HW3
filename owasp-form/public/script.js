const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    message.textContent = "Email and password cannot be empty.";
    message.style.color = "red";
    return;
  }

  if (!email.includes("@")) {
    message.textContent = "Email must contain @.";
    message.style.color = "red";
    return;
  }

  if (password.length < 8) {
    message.textContent = "Password must be at least 8 characters long.";
    message.style.color = "red";
    return;
  }

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    message.textContent = data.message;
    message.style.color = data.success ? "green" : "red";
  } catch (error) {
    message.textContent = "Server error.";
    message.style.color = "red";
  }
});