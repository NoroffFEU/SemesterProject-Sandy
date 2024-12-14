import { placeBid } from "../bids/placeBid.js";
import { getLoggedInUser } from "../helpers/userHelper.js";

function getListingId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchListingData(id) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${id}?_bids=true&_seller=true`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        displayListingData(result.data);
    } catch (error) {
        console.error(error);
    }
}

function calculateTimeBetween(start, end) {
    let text = "";

    // get total seconds between the times
    let delta = Math.abs(end - start) / 1000;

    // calculate (and subtract) whole days
    const days = Math.floor(delta / 86400);
    if (days > 0) {
        text += days + " days ";
    }
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    const hours = Math.floor(delta / 3600) % 24;
    if (hours > 0) {
        text += hours + " hours ";
    }
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    const minutes = Math.floor(delta / 60) % 60;
    if (minutes > 0) {
        text += minutes + " minutes ";
    }
    delta -= minutes * 60;

    // what's left is seconds
    const seconds = delta % 60;  // in theory the modulus is not required
    text += Math.floor(seconds) + " seconds";

    return text;
}

function displayListingData(data) {
    document.getElementById('product-title').textContent = data.title;
    document.getElementById('product-description').textContent = data.description;
    if (data.bids.length === 0) {
        document.getElementById('product-bid').textContent = "No bids yet";
    } else {
        const highestBid = data.bids
            .map(bid => bid.amount)
            .sort((a, b) => b - a)[0];
        document.getElementById('product-bid').textContent = "Highest bid: " + highestBid;
    }

    const endsAt = new Date(data.endsAt);

    if (endsAt < new Date()) {
        document.getElementById('product-time-left').textContent = "Auction has ended";
        return;
    }

    setInterval(() => {
        const now = new Date();

        const text = endsAt < now
            ? "Auction has ended"
            : "Ends in: " + calculateTimeBetween(now, endsAt);

        document.getElementById('product-time-left').textContent = text;
    }, 1000);
    
    const imagesContainer = document.getElementById('product-images');
    if (data.media && data.media.length > 0) {
        data.media.forEach(media => {
            const image = document.createElement('img');
            image.src = media.url;
            imagesContainer.appendChild(image);
        });
    } else {
        const noImage = document.createElement('p');
        noImage.textContent = "No images available";
        imagesContainer.appendChild(noImage);
    }

    const loggedInUser = getLoggedInUser();

    const placeBidButton = document.getElementById('place-bid-button');

    if (loggedInUser && loggedInUser.email !== data.seller.email) {
        placeBidButton.classList.remove('hide');
    }
    const placeBidsPopup = document.getElementById('place-bids-popup');
    const placeBidForm = document.getElementById('place-bid-form');
    placeBidForm.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(placeBidForm);
        const bidAmount = parseFloat(formData.get('bid'));
        if (bidAmount) {
            try {
                await placeBid(data.id, bidAmount);
                alert('Bid placed!');
                placeBidsPopup.classList.add('hide');
                window.location.reload();
            } catch (error) {
                alert(error);
            }
        }
    });
    document.getElementById('close-place-bids-popup').addEventListener('click', () => {
        placeBidsPopup.classList.add('hide');
    });
    placeBidsPopup.addEventListener('click', e => {
        if (e.target === placeBidsPopup) {
            placeBidsPopup.classList.add('hide');
        }
    });
    placeBidButton.addEventListener('click', async () => {
        placeBidsPopup.classList.remove('hide');
    });

    if (data.bids && data.bids.length > 0) {
        const viewBidsPopup = document.getElementById('view-bids-popup');
        viewBidsPopup.addEventListener('click', e => {
            if (e.target === viewBidsPopup) {
                viewBidsPopup.classList.add('hide');
            }
        });
        document.getElementById('close-view-bids-popup').addEventListener('click', () => {
            viewBidsPopup.classList.add('hide');
        });
        const bidsContainer = document.getElementById('bids-list');
        const viewBidsButton = document.getElementById('view-bids-button');
        viewBidsButton.addEventListener('click', () => {
            viewBidsPopup.classList.remove('hide');
        });
        
        viewBidsButton.classList.remove('hide');
        const bidItem = document.getElementById('bid-item-template');
        data.bids.sort((a,b) => b.amount - a.amount).forEach(bid => {
            const bidElement = bidItem.content.cloneNode(true);
            const li = bidElement.querySelector('li');
            li.textContent = `${bid.amount} - ${bid.bidder.name}`;
            bidsContainer.appendChild(bidElement);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const id = getListingId();
    if (id) {
        fetchListingData(id);
    } else {
        alert('No listing ID provided');
    }
});
