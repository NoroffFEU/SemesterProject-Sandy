import { fetchListings } from "../../listings/fetchListings.js";

function displayListings(listings) {
  const listingContainer = document.getElementById("listing-container");

  listings.forEach((listing) => {
    const template = document.getElementById("listing-template");
    const card = template.content.cloneNode(true);

    const image = card.querySelector("#image");
    const title = card.querySelector("#title");
    const currentBid = card.querySelector("#currentBid");

    listingContainer.appendChild(card);

    if (listing.media.length > 0) {
        const imageUrl = listing.media[0].url;
        image.src = imageUrl
    }
    title.textContent = listing.title;
    if (listing.bids.length === 0) {
        currentBid.textContent = "No bids yet";
    } else {
        currentBid.textContent = "Highest bid: " + listing.bids
            .map(bid => bid.amount)
            .sort((a, b) => b - a)[0];
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const listings = await fetchListings();
        displayListings(listings);
        
    } catch (error) {
        console.error(error);
        alert("An error occurred while fetching listings");
    }
});
