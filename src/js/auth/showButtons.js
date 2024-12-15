export function showButtons() {
    document.addEventListener("DOMContentLoaded", () => {
        const loginButtons = document.querySelectorAll(".loginButton");
        const logoutButtons = document.querySelectorAll(".logoutButton");
        const profileButtons = document.querySelectorAll(".profileBtn");
    
        if (localStorage.getItem("token")) {
            loginButtons.forEach(btn => btn.classList.add("hide"));
            logoutButtons.forEach(btn => btn.classList.remove("hide"));
            profileButtons.forEach(btn => btn.classList.remove("hide"));
        }
    });
} 