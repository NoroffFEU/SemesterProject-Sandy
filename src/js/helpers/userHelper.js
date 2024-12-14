export function getLoggedInUser() {
    return localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
}