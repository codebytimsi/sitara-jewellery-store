const cartItemsContainer = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("sitaraCart")) || [];


// Display Cart
function displayCart() {

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your bag is waiting.</h2>
                <p>You haven't added anything to your cart yet.</p>
                <a href="shop.html" class="primary-btn">
                    Explore Collection
                </a>
            </div>
        `;

        cartSubtotal.textContent = "₹0";
        cartTotal.textContent = "₹0";

        updateCartCount();
        return;
    }


    cartItemsContainer.innerHTML = cart.map((item) => {

        const itemTotal = item.price * item.quantity;

        return `
            <div class="cart-item">

                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>

                <div class="cart-item-info">

                    <p class="product-category">
                        ${item.category}
                    </p>

                    <h3>${item.name}</h3>

                    <p class="cart-item-price">
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>

                    <div class="cart-item-actions">

                        <div class="cart-quantity">

                            <button
                                onclick="changeQuantity(${item.id}, -1)"
                            >
                                −
                            </button>

                            <span>${item.quantity}</span>

                            <button
                                onclick="changeQuantity(${item.id}, 1)"
                            >
                                +
                            </button>

                        </div>

                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${item.id})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

                <div class="cart-item-total">
                    ₹${itemTotal.toLocaleString("en-IN")}
                </div>

            </div>
        `;
    }).join("");


    updateCartSummary();
    updateCartCount();
}


// Change Quantity
function changeQuantity(productId, change) {

    const item = cart.find(
        (product) => product.id === productId
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(
            (product) => product.id !== productId
        );
    }

    saveCart();
    displayCart();
}


// Remove Product
function removeFromCart(productId) {

    cart = cart.filter(
        (product) => product.id !== productId
    );

    saveCart();
    displayCart();
}


// Update Summary
function updateCartSummary() {

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    cartSubtotal.textContent =
        `₹${subtotal.toLocaleString("en-IN")}`;

    cartTotal.textContent =
        `₹${subtotal.toLocaleString("en-IN")}`;
}


// Update Navbar Cart Count
function updateCartCount() {

    const cartCountElements =
        document.querySelectorAll(".cart-count");

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCountElements.forEach((element) => {
        element.textContent = totalItems;
    });
}


// Save Cart
function saveCart() {

    localStorage.setItem(
        "sitaraCart",
        JSON.stringify(cart)
    );
}


// Initial Load
displayCart();

const checkoutBtn = document.querySelector(".checkout-btn");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Your cart is empty. Add something from the collection first.");
            return;
        }

        alert(
            "Thank you for shopping with SITARA ✦\n\n" +
            "Checkout is coming soon!"
        );
    });
}