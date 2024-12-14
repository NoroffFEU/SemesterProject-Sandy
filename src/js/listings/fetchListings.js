import { API_KEY } from "../../../services/api/apiKey.js";

async function fetchListingsImpl(url, token) {
  try {
    // Only fetching listings with vintage tag to make the site feel more authentic as it primarily sells only vintage items !!!
    const headers = {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      method: "GET",
      headers
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

export function fetchListings() {
  return fetchListingsImpl("https://v2.api.noroff.dev/auction/listings?_bids=true&_tag=vintage&sortOrder=asc");
}

export async function fetchListingsByProfile(profile) {
  const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('You must be logged in to place a bid');
    }
  return fetchListingsImpl(`https://v2.api.noroff.dev/auction/profiles/${profile}/listings?_bids=true&_tag=vintage&sortOrder=asc`, token);
}
