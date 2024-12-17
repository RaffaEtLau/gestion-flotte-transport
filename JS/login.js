import { authenticate } from "./modules/auth.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.querySelector('input[name="role"]:checked').value;

  try {
    const user = await authenticate(username, password, role);

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        username: user.username,
        role: user.role,
      })
    );

    // Redirection selon le rôle
    if (role === "driver") {
      window.location.href = "chauffeur.html";
    } else if (role === "manager") {
      window.location.href = "driver.html";
    }
  } catch (error) {
    alert("Identifiants ou rôle incorrect");
  }
});
