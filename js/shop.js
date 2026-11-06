/* ========================================
   SITARA — SHOP PAGE
======================================== */

const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");

const filterButtons = document.querySelectorAll(".filter-btn");
const sortSelect = document.getElementById("sortProducts");

let currentCategory = "all";


/* ========================================
   DISPLAY PRODUCTS
======================================== */

function displayProducts(productList) {

    productGrid.innerHTML = "";

    if (productList.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";


    productList.forEach((product) => {

        const productCard = document.createElement("article");

        productCard.classList.add("product-card");


        productCard.innerHTML = `
            
            <a href="product.html?id=${product.id}" class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <span class="product-category">
                    ${product.category}
                </span>

            </a>


            <div class="product-info">

                <p class="product-type">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <button
                        class="add-cart-btn"
                        data-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;


        productGrid.appendChild(productCard);

    });


    attachCartButtons();
}


/* ========================================
   FILTER PRODUCTS
======================================== */

function filterProducts() {

    let filteredProducts;


    if (currentCategory === "all") {

        filteredProducts = [...products];

    } else {

        filteredProducts = products.filter(
            (product) =>
                product.category === currentCategory
        );

    }


    sortProducts(filteredProducts);
}


/* ========================================
   SORT PRODUCTS
======================================== */

function sortProducts(productList) {

    const sortValue = sortSelect.value;

    let sortedProducts = [...productList];


    if (sortValue === "low") {

        sortedProducts.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sortValue === "high") {

        sortedProducts.sort(
            (a, b) => b.price - a.price
        );

    }


    if (sortValue === "name") {

        sortedProducts.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    displayProducts(sortedProducts);
}


/* ========================================
   CATEGORY BUTTONS
======================================== */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });


        button.classList.add("active");


        currentCategory =
            button.dataset.category;


        filterProducts();

    });

});


/* ========================================
   SORT SELECT
======================================== */

sortSelect.addEventListener("change", () => {

    filterProducts();

});


/* ========================================
   ADD TO CART
======================================== */

function attachCartButtons() {

    const cartButtons =
        document.querySelectorAll(".add-cart-btn");


    cartButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);


            const selectedProduct =
                products.find(
                    (product) =>
                        product.id === productId
                );


            if (!selectedProduct) return;


            addToCart(selectedProduct);


            button.textContent = "Added ✓";


            setTimeout(() => {

                button.textContent = "Add to Cart";

            }, 1200);

        });

    });

}


/* ========================================
   CART STORAGE
======================================== */

function addToCart(product) {

    let cart =
        JSON.parse(
            localStorage.getItem("sitaraCart")
        ) || [];


    const existingProduct =
        cart.find(
            (item) =>
                item.id === product.id
        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    localStorage.setItem(
        "sitaraCart",
        JSON.stringify(cart)
    );


    updateCartCount();
}


/* ========================================
   CART COUNT
======================================== */

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("sitaraCart")
        ) || [];


    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartCount =
        document.querySelector(".cart-count");


    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }

}


/* ========================================
   INITIAL LOAD
======================================== */

displayProducts(products);

updateCartCount();

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const closeSearch = document.getElementById("closeSearch");

if (searchBtn && searchBox) {

    searchBtn.addEventListener("click", () => {
        searchBox.classList.add("active");
        searchInput.focus();
    });

    closeSearch.addEventListener("click", () => {
        searchBox.classList.remove("active");
        searchInput.value = "";

        displayProducts(products);
    });
}

searchInput.addEventListener("input", () => {

    const searchTerm = searchInput.value
        .toLowerCase()
        .trim();

    if (!searchTerm) {
        displayProducts(products);
        return;
    }

    const filteredProducts = products.filter((product) => {

        const name = product.name.toLowerCase();
        const category = product.category.toLowerCase();

        // Exact category search
        if (
            searchTerm === "ring" ||
            searchTerm === "rings"
        ) {
            return category === "rings";
        }

        if (
            searchTerm === "necklace" ||
            searchTerm === "necklaces"
        ) {
            return category === "necklaces";
        }

        if (
            searchTerm === "earring" ||
            searchTerm === "earrings"
        ) {
            return category === "earrings";
        }

        if (
            searchTerm === "bracelet" ||
            searchTerm === "bracelets"
        ) {
            return category === "bracelets";
        }

        // For product names
        return name.includes(searchTerm);
    });

    displayProducts(filteredProducts);
});