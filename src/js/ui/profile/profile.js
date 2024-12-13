import { getProfile } from "../../profile/profile.js";

export function renderProfile() {
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const profile = await getProfile();
            document.getElementById("profile-credits").textContent = profile.data.credits;
            document.getElementById("profile-name").textContent = profile.data.name;
            document.getElementById("profile-email").textContent = profile.data.email;
            document.getElementById("profile-avatar").src = profile.data.avatar.url;
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    });

    document.addEventListener("avatar-updated", (e) => {
        const newAvatarUrl = e.detail.newAvatarUrl;
        document.getElementById("profile-avatar").src = newAvatarUrl;
    });
}

renderProfile();