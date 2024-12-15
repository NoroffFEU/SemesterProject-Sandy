export function getLoggedInUser() {
    return localStorage.getItem("token") && localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
}