export function setupLogoutBtn() {
    document.querySelectorAll(".logoutButton").forEach(btn => btn.addEventListener("click", onLogout));
    
    // Function called when logout button is clicked.
    // Removes token from local storage, redirects to login page.
    
     function onLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
        alert("You have been logged out.");
    }
}

