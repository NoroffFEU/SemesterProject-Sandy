export function setupLogoutBtn() {
    document.getElementById("logoutBtn").addEventListener("click", onLogout);
    
    // Function called when logout button is clicked.
    // Removes token from local storage, redirects to login page.
    
     function onLogout() {
        localStorage.removeItem("token");
        window.location.href = "/";
        alert("You have been logged out.");
    }
}

