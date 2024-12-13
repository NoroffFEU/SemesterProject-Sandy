import { API_KEY } from "../../../services/api/apiKey.js";

export async function register({name, email, avatar, password}) {
  const body = JSON.stringify({
    name: name,
    email: email,
    avatar: avatar,
    password: password,
  });

  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      method: "POST",
      body,
    });
    if (response.ok) {
      const data = await response.json();
      const { accessToken: token, ...user } = data;

      // Store token and user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      const errorData = await response.json(); // Handle error response from API
      console.error("An error occurred during registration:", errorData);
      throw new Error(errorData.message || "Registration failed: ");
    }
  } catch (error) {
    console.error("An error occurred during registration:", error);
  }
}
