export function showButtons() {
    document.addEventListener("DOMContentLoaded", () => {
        const login = document.getElementById("loginBtn");
        const logout = document.getElementById("logoutBtn");
        const profile = document.getElementById("profileBtn");
    
        if (localStorage.getItem("token")) {
            login.classList.add("hide");
            logout.classList.remove("hide");
            profile.classList.remove("hide");
    
        }
    });
} 