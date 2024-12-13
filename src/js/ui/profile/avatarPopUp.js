
// Adds listener to button, when clicked it applies a show class with display block to show popup
avatarBtn.addEventListener('click', () => {
    popUp.classList.add('show');
    });

// Adds listener to close button, when clicked it removes show class to hide popup
closeBtn.addEventListener('click', () => {
    popUp.classList.remove('show');
    });

// Adds listener to window, when clicked outside of popup it removes show class to hide popup
window.addEventListener('click', (e) => {
    if (e.target === popUp) {
        popUp.classList.remove('show');
    }
    });