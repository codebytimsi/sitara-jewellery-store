const productId = new URLSearchParams(window.location.search).get("id");

const product = products.find(
    (item) => item.id === Number(productId)
);

const productContainer = document.getElementById("productDetails");

if (!product) {
    productContainer.innerHTML = `
        <div class="empty-state">
            <h2>Product not found</h2>
            <p>Sorry, this product doesn't exist.</p>
            <a href="shop.html" class="primary-btn">Back to Shop</a>
        </div>
    `;
} else {
    productContainer.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-detail-info">
            <p class="product-category">${product.category}</p>

            <h1>${product.name}</h1>

            <p class="product-detail-price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>

            <p class="product-detail-description">
                ${product.description}
            </p>

            <div class="quantity-wrapper">
                <button id="decreaseQty">−</button>
                <span id="quantity">1</span>
                <button id="increaseQty">+</button>
            </div>

            <button class="primary-btn" id="addToCart">
                Add to Cart
            </button>

            <a href="shop.html" class="back-link">
                ← Back to Shop
            </a>
        </div>
    `;

    let quantity = 1;

    const quantityDisplay = document.getElementById("quantity");
    const decreaseBtn = document.getElementById("decreaseQty");
    const increaseBtn = document.getElementById("increaseQty");
    const addToCartBtn = document.getElementById("addToCart");

    decreaseBtn.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });

    increaseBtn.addEventListener("click", () => {
        quantity++;
        quantityDisplay.textContent = quantity;
    });

    addToCartBtn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("sitaraCart")) || [];

        const existingProduct = cart.find(
            (item) => item.id === product.id
        );

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity: quantity
            });
        }

        localStorage.setItem("sitaraCart", JSON.stringify(cart));

        updateCartCount();

        addToCartBtn.textContent = "Added to Cart ✓";

        setTimeout(() => {
            addToCartBtn.textContent = "Add to Cart";
        }, 1500);
    });
}