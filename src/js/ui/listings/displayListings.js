import { fetchListings, fetchListingsByProfile, fetchListingsBySearch } from "../../listings/fetchListings.js";
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

function setupSearchButton() {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value;
        window.location.href = `./products.html?query=${query}`;
    });
}

function setupPaginationButtons(meta) {
    const params = new URLSearchParams(location.search);
    const page = params.get("page") && parseInt(params.get("page")) || 1;
    const previousButton = document.getElementById("previous-button");
    const nextButton = document.getElementById("next-button");

    if (!meta.isFirstPage) {
        previousButton.classList.remove("hide");
    }

    if (!meta.isLastPage) {
        nextButton.classList.remove("hide");
    }

    previousButton.addEventListener("click", () => {
        const newPage = page - 1;
        window.location.href = `./products.html?page=${newPage}`;
    });

    nextButton.addEventListener("click", () => {
        const newPage = page + 1;
        window.location.href = `./products.html?page=${newPage}`;
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        setupSearchButton();
        const params = new URLSearchParams(location.search)
        const profile = params.get("profile");
        const page = params.get("page") && parseInt(params.get("page")) || 1;
        const limit = 12;
        let listingResponse;
        const user = getLoggedInUser();
        if (user && profile === 'self') {
            const allListingsButton = document.getElementById("all-listings-button");
            allListingsButton.classList.remove("hide");
            listingResponse = await fetchListingsByProfile(user.name, { page, limit });
        } else {
            if (user) {
                const myListingsButton = document.getElementById("my-listings-button");
                myListingsButton.classList.remove("hide");
            }
            const query = params.get("query");
            if (query) {
                listingResponse = await fetchListingsBySearch(query, { page, limit });
            } else {
                listingResponse = await fetchListings({ page, limit });
            }
        }
        const listings = listingResponse.data;
        displayListings(listings);
        setupPaginationButtons(listingResponse.meta);
        
    } catch (error) {
        console.error(error);
        alert("An error occurred while fetching listings");
    }
});
