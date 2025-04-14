// File: public/assets/js/login.js

// Simulate a simple login function
export function login(username, password) {
    if (username === "admin" && password === "1234") {
        localStorage.setItem("loggedIn", true);
        window.location.href = "./dashboard";
    } else {
        alert("Incorrect username or password");
    }
}

// Handle login form submission
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(username, password);
});

// Handle logout
document.getElementById("logoutButton")?.addEventListener("click", function () {
    localStorage.removeItem("loggedIn");
    window.location.href = "./login";
});
