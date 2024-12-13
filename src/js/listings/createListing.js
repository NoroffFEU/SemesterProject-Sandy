import { API_KEY } from "../../../services/api/apiKey.js";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('listing-form');
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login.html';
        alert('You must be logged in to create a listing');
        console.error("User is not logged in");
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const image = document.getElementById('image').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const tags = ["vintage"];

        const listingData = {
            tags: tags,
            title: title,
            description: description,
            endsAt: date,
            media: [
                {
                    url: image,
                }
            ]
        };

        try {
            const response = await fetch("https://v2.api.noroff.dev/auction/listings", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    "X-Noroff-API-Key": API_KEY,
                },
                body: JSON.stringify(listingData),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }
            const result = await response.json();
            console.log(result);

            alert('Listing created successfully');
            window.location.href = '/pages/product/products.html';
    } catch (error) {
        console.error('Error creating listing', error);
        alert(error.message);
    }
    });
});