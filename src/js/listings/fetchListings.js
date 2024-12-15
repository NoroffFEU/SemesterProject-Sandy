import { API_KEY } from "../../../services/api/apiKey.js";

async function fetchListingsImpl(url, { token, page, limit }) {
  try {
    // Only fetching listings with vintage tag to make the site feel more authentic as it primarily sells only vintage items !!!
    const headers = {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    url.searchParams.append("_bids", "true");
    url.searchParams.append("_tag", "vintage");
    url.searchParams.append("sortOrder", "asc");
    url.searchParams.append("page", page || 1);
    url.searchParams.append("limit", limit || 12);
    
    const response = await fetch(url, {
      method: "GET",
      headers
    });

    if (!response.ok) {
        throw new Error("Unable to fetch listings");
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function fetchListings(options) {
  const url = new URL("https://v2.api.noroff.dev/auction/listings");
  return fetchListingsImpl(url, options);
}

export async function fetchListingsByProfile(profile, options) {
  const token = localStorage.getItem('token');

  if (!token) {
      throw new Error('You must be logged in to place a bid');
  }
  const url = new URL(`https://v2.api.noroff.dev/auction/profiles/${profile}/listings`);
  return fetchListingsImpl(url, { token, ...options });
}

/**
 * Fetches listings by search query
 * @param {string} query - Search for listings by their title or description properties.
 */
export async function fetchListingsBySearch(query, options) {
  const url = new URL(`https://v2.api.noroff.dev/auction/listings/search?q=${query}`);
  return fetchListingsImpl(url, options);
}
