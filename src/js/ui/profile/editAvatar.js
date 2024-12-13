import { API_KEY } from "../../../../services/api/apiKey.js";
import { getProfile } from "../../profile/profile.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("edit-avatar-form");
  const avatarInput = document.getElementById("profile-avatar-input");
  const popUp = document.getElementById("popUp");
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user"));


  if (!token || !userData) {
    window.location.href = "/login";
    alert("You need to login first");
    console.error("User not logged in");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newAvatarUrl = avatarInput.value;
    if (!newAvatarUrl) {
      alert("Please provide a valid URL");
      return;
    }

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/auction/profiles/${userData.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": API_KEY,
          },
          body: JSON.stringify({
            avatar: {
                url: newAvatarUrl
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update avatar");
      }

      document.dispatchEvent(new CustomEvent("avatar-updated", {
        detail: {
          newAvatarUrl,
        },
      }));

      popUp.classList.remove("show");

    } catch (error) {
      console.error("Error updating avatar:", error);
      alert(error.message);
    }
  });
});