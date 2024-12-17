export async function authenticate(username, password, role) {
  const authUsers = JSON.parse(localStorage.getItem("authUsers") || "[]");
  const user = authUsers.find(
    (u) => u.username === username && u.password === password && u.role === role
  );
  // Simulation d'un appel serveur
  return new Promise((resolve, reject) => {
    if (user) {
      resolve(user);
    } else {
      reject(new Error("Authentication échouée"));
    }
  });
}

export function isAuthenticated() {
  const user = sessionStorage.getItem("user");
  return user !== null;
}

export function getCurrentUser() {
  const userString = sessionStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
}

export function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}

export function initDefaultUsers() {
  const authUsers = JSON.parse(localStorage.getItem("authUsers") || "[]");
  if (authUsers.length === 0) {
    const defaultUsers = [
      { username: "driver1", password: "driver123", role: "driver" },
      { username: "manager1", password: "admin123", role: "manager" },
    ];
    localStorage.setItem("authUsers", JSON.stringify(defaultUsers));
  }
}

initDefaultUsers();
