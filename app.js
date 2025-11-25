// --- 1. DATA HANDLING (Arrays and Objects) ---
// This data is used across multiple pages (Menu, Home Special)
const menuItems = [
    { id: 1, name: 'Espresso', price: 3.00, category: 'coffee' },
    { id: 2, name: 'Latte', price: 4.50, category: 'coffee' },
    { id: 3, name: 'Matcha Tea', price: 4.75, category: 'tea' },
    { id: 4, name: 'Cold Brew', price: 4.00, category: 'coffee' },
    { id: 5, name: 'Croissant', price: 2.50, category: 'pastry' },
    { id: 6, name: 'Scone', price: 3.25, category: 'pastry' }
];

// Shopping cart data state (Uses localStorage for persistence between page navigations)
let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []; 

// --- 2. REUSABLE FUNCTIONS (Cart Management) ---

/**
 * Saves the current cart state to browser's localStorage.
 */
function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

/**
 * Calculates the total cost of all items in the shopping cart.
 * @returns {string} The total price formatted to two decimal places.
 */
function calculateCartTotal() {
    // Logic & Loops: Uses the reduce method for summation.
    const total = shoppingCart.reduce((sum, item) => sum + item.price, 0);
    return total.toFixed(2);
}

/**
 * Updates the cart count and total displayed in the header and modal.
 * DOM Manipulation: Updates multiple elements.
 */
function updateCartDisplay() {
    const countElement = document.getElementById('cartCount');
    const totalElement = document.getElementById('cartTotal');
    const modalTotalElement = document.getElementById('modalCartTotal');
    
    // Only update if the elements exist on the current page (i.e., menu.html)
    if (countElement && totalElement && modalTotalElement) {
        const count = shoppingCart.length;
        const total = calculateCartTotal();
        
        countElement.textContent = count;
        totalElement.textContent = total;
        modalTotalElement.textContent = total;
        
        renderCartItems();
    }
}

/**
 * Adds an item to the shopping cart array.
 * @param {number} itemId - The ID of the item to add.
 */
function addToCart(itemId) {
    const itemToAdd = menuItems.find(item => item.id === itemId);
    if (itemToAdd) {
        shoppingCart.push(itemToAdd);
        saveCart();
        updateCartDisplay();
        alert(`${itemToAdd.name} added to cart!`);
    }
}

/**
 * Renders the list of items inside the cart modal.
 * DOM Manipulation: Handles the cart list display.
 */
function renderCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    if (!cartItemsDiv) return;

    cartItemsDiv.innerHTML = ''; 

    if (shoppingCart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        return;
    }

    // Logic & Loops: Iterate through the shopping cart array
    shoppingCart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        // Note: For simplicity, we don't allow removal from cart here, but it would be simple to add.
        cartItemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });
}


// --- 3. PAGE-SPECIFIC INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    // Check which page we are on to run the relevant code
    const path = document.location.pathname;

    updateCartDisplay(); // Always check for cart updates

    // ----------------------------------------------------------------------------------
    // A. INDEX.HTML (Home/About Page Logic)
    // ----------------------------------------------------------------------------------
    if (path.includes('index.html') || path === '/') {
        
        // Home Special Button (Conditional Logic & Events)
        const specialDisplay = document.getElementById('specialDisplay');
        const featuredItem = menuItems[3]; // Cold Brew
        document.getElementById('showSpecialBtn').addEventListener('click', () => {
            const isHidden = specialDisplay.classList.contains('hidden');
            if (isHidden) {
                specialDisplay.textContent = `Today's Special: The ${featuredItem.name} for only $${featuredItem.price.toFixed(2)}!`;
                specialDisplay.classList.remove('hidden');
            } else {
                specialDisplay.classList.add('hidden');
            }
        });

        // About Page Team Toggle (Events & DOM Manipulation)
        const toggleTeamBtn = document.getElementById('toggleTeamBtn');
        const teamInfo = document.getElementById('teamInfo');
        toggleTeamBtn.addEventListener('click', () => {
            teamInfo.classList.toggle('hidden');
            if (teamInfo.classList.contains('hidden')) {
                 toggleTeamBtn.textContent = 'Show/Hide Our Baristas';
            } else {
                 toggleTeamBtn.textContent = 'Hide Our Baristas';
            }
        });
    }

    // ----------------------------------------------------------------------------------
    // B. MENU.HTML (Menu/Ordering Page Logic)
    // ----------------------------------------------------------------------------------
    if (path.includes('menu.html')) {
        
        // Initial rendering function
        function renderMenuItems(itemsToRender) {
            const menuList = document.getElementById('menuList');
            menuList.innerHTML = ''; 

            itemsToRender.forEach(item => {
                // DOM Manipulation: Create new HTML elements for each item
                const itemDiv = document.createElement('div');
                itemDiv.className = 'menu-item';
                itemDiv.innerHTML = `
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-category">${item.category}</p>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                    <button class="addToCartBtn" data-id="${item.id}">Add to Cart</button>
                `;
                menuList.appendChild(itemDiv);
            });

            // Events: Attach listeners to the dynamically created buttons
            document.querySelectorAll('.addToCartBtn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const itemId = parseInt(event.target.getAttribute('data-id'));
                    addToCart(itemId);
                });
            });
        }
        
        // Logic & Events for Filtering and Searching
        function filterAndSearch() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const category = document.getElementById('categoryFilter').value;

            // Logic & Loops: Filter the main array based on criteria
            const filteredItems = menuItems.filter(item => {
                const matchesSearch = item.name.toLowerCase().includes(searchTerm);
                const matchesCategory = category === 'all' || item.category === category;
                return matchesSearch && matchesCategory;
            });

            renderMenuItems(filteredItems);
        }

        // Attach listeners to search/filter controls
        document.getElementById('searchInput').addEventListener('keyup', filterAndSearch);
        document.getElementById('categoryFilter').addEventListener('change', filterAndSearch);

        // Initial render of all items
        renderMenuItems(menuItems); 

        // Cart Modal Toggles (Events)
        const cartModal = document.getElementById('cartModal');
        document.getElementById('viewCartBtn').addEventListener('click', () => {
            renderCartItems(); // Ensure cart is up-to-date before opening
            cartModal.classList.remove('hidden');
        });
        document.querySelector('.close-btn').addEventListener('click', () => {
            cartModal.classList.add('hidden');
        });
        window.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                cartModal.classList.add('hidden');
            }
        });

        // Checkout button
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            if (shoppingCart.length > 0) {
                alert(`Order placed! Total: $${calculateCartTotal()}. Thank you!`);
                shoppingCart = []; 
                saveCart();
                updateCartDisplay();
                cartModal.classList.add('hidden');
            } else {
                alert('Your cart is empty. Please add items before checking out.');
            }
        });
    }

    // ----------------------------------------------------------------------------------
    // C. CONTACT.HTML (Form Validation Logic)
    // ----------------------------------------------------------------------------------
    if (path.includes('contact.html')) {

        // Reusable Functions for error display
        function displayError(id, message) {
            document.getElementById(id).textContent = message;
            document.getElementById(id).classList.remove('hidden');
        }
        function clearError(id) {
            document.getElementById(id).textContent = '';
            document.getElementById(id).classList.add('hidden');
        }

        // Main validation function
        function validateForm(event) {
            event.preventDefault(); 
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;

            // Logic & Loops: Validation checks
            
            if (name.length < 2) {
                displayError('nameError', 'Please enter your full name (2+ chars).');
                isValid = false;
            } else {
                clearError('nameError');
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                displayError('emailError', 'Please enter a valid email address (e.g., user@domain.com).');
                isValid = false;
            } else {
                clearError('emailError');
            }

            if (message.length < 10) {
                displayError('messageError', 'Message must be at least 10 characters long.');
                isValid = false;
            } else {
                clearError('messageError');
            }

            if (isValid) {
                alert('Success! Form Data is valid and ready for backend processing (Simulated).');
                document.getElementById('contactForm').reset();
            }
        }
        
        // Events: Attach listener to form submission
        document.getElementById('contactForm').addEventListener('submit', validateForm);
    }
});