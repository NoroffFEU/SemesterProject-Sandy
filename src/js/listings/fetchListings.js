import { API_KEY } from "../../../services/api/apiKey.js";

export async function fetchListings() {
  try {
    // Only fetching listings with vintage tag to make the site feel more authentic as it primarily sells only vintage items !!!
    const response = await fetch("https://v2.api.noroff.dev/auction/listings?_bids=true&_tag=vintage&sortOrder=asc", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
        throw new Error("Unable to fetch listings");
    }

    const result = await response.json();
    const listings = result.data;

    if (Array.isArray(listings)) {
        return listings.slice(0, 12);
    } else {
        throw new Error("Unable to fetch listings");
    }

  } catch (error) {
    console.error(error);
    throw error;
  }
}
