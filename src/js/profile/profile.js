import { API_KEY } from "../../../services/api/apiKey.js";

export async function getProfile() {
  const token = localStorage.getItem("token");
  const userDataString = localStorage.getItem("user");
  if (!userDataString) {
    throw new Error("User data not found");
  }

  const userdata = JSON.parse(userDataString);
  const name = userdata.name;

  if (!name) {
    throw new Error("User name not found");
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/profiles/${name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error("An error occurred while fetching profile:", errorData);
      throw new Error(errorData.message || "Failed to get profile data");
    }
  } catch (error) {
    console.error("An error occurred while fetching profile:", error);
    throw error;
  }
}
