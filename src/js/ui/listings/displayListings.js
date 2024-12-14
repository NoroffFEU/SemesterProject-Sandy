import { fetchListings, fetchListingsByProfile } from "../../listings/fetchListings.js";
import { getLoggedInUser } from "../../helpers/userHelper.js";

function displayListings(listings) {
  const listingContainer = document.getElementById("listing-container");

  listings.forEach((listing) => {
    const template = document.getElementById("listing-template");
    const card = template.content.cloneNode(true);

    const image = card.querySelector("#image");
    const title = card.querySelector("#title");
    const currentBid = card.querySelector("#currentBid");

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

    const viewProductBtn = card.querySelector("#view-product-btn");

    viewProductBtn.addEventListener("click", () => {
        window.location.href = `./singleproduct.html?id=${listing.id}`;
    });

    listingContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const params = new URLSearchParams(location.search)
        const profile = params.get("profile");
        let listings;
        if (profile === 'self') {
            const allListingsButton = document.getElementById("all-listings-button");
            allListingsButton.classList.remove("hide");
            const user = getLoggedInUser();
            listings = await fetchListingsByProfile(user.name);
        } else {
            const myListingsButton = document.getElementById("my-listings-button");
            myListingsButton.classList.remove("hide");
            listings = await fetchListings();
        }
        displayListings(listings);
        
    } catch (error) {
        console.error(error);
        alert("An error occurred while fetching listings");
    }
});
