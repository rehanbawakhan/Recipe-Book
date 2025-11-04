// auth.js
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  // --- SIGNUP LOGIC ---
  if (currentPage === "signup.html") {
    const form = document.querySelector(".auth-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("input[placeholder='Full Name']").value;
      const username = form.querySelector("input[placeholder='Username']").value;
      const password = form.querySelector("input[placeholder='Password']").value;

      if (username && password) {
        // Save to localStorage
        localStorage.setItem("recipeUser", JSON.stringify({ name, username, password }));
        alert("Account created successfully! You can now log in.");
        window.location.href = "login.html";
      }
    });
  }

  // --- LOGIN LOGIC ---
  if (currentPage === "login.html") {
    const form = document.querySelector(".auth-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = form.querySelector("input[placeholder='Username']").value;
      const password = form.querySelector("input[placeholder='Password']").value;
      const savedUser = JSON.parse(localStorage.getItem("recipeUser"));

      if (savedUser && savedUser.username === username && savedUser.password === password) {
        localStorage.setItem("isLoggedIn", "true");
        alert(`Welcome back, ${savedUser.name}!`);
        window.location.href = "index.html";
      } else {
        alert("Invalid username or password!");
      }
    });
  }

  // --- LOGOUT LOGIC ---
  if (currentPage === "index.html") {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      window.location.href = "login.html";
    } else {
      const nav = document.querySelector(".nav-links");
      const logoutBtn = document.createElement("li");
      logoutBtn.innerHTML = `<a href="#" class="nav-link" id="logoutBtn">Logout</a>`;
      nav.appendChild(logoutBtn);

      document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        alert("Logged out successfully!");
        window.location.href = "login.html";
      });
    }
  }
});
