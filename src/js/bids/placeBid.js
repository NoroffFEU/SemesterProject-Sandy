import { API_KEY } from "../../../services/api/apiKey.js";

export async function placeBid(listingId, amount) {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('You must be logged in to place a bid');
    }

    const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${listingId}/bids`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.errors.map(err => err.message).reduce((acc, curr) => acc + curr + '\n', '');
        throw new Error(message || 'Something went wrong');
    }

    return await response.json();
}

