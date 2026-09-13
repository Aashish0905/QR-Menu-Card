
/* =========================================================
   HOTEL JATASHANKAR
   PREMIUM DIGITAL MENU
   script.js
========================================================= */


/* =========================================================
   1. MENU DATA
   ---------------------------------------------------------
   अगर आपकी HTML में menu cards पहले से हैं तो यह data
   optional है। नीचे का script HTML cards से भी काम कर सकता है.
========================================================= */

const menuData = [
    {
        id: 1,
        name: "Paneer Butter Masala",
        category: "main-course",
        price: 220,
        description: "Soft paneer cooked in rich buttery tomato gravy.",
        image: "images/paneer-butter-masala.jpg",
        tag: "Popular"
    },

    {
        id: 2,
        name: "Shahi Paneer",
        category: "main-course",
        price: 240,
        description: "Creamy royal paneer gravy with aromatic spices.",
        image: "images/shahi-paneer.jpg",
        tag: "Chef Special"
    },

    {
        id: 3,
        name: "Dal Tadka",
        category: "main-course",
        price: 160,
        description: "Yellow dal tempered with garlic, cumin and spices.",
        image: "images/dal-tadka.jpg",
        tag: "Popular"
    },

    {
        id: 4,
        name: "Butter Naan",
        category: "breads",
        price: 45,
        description: "Soft tandoori naan finished with melted butter.",
        image: "images/butter-naan.jpg",
        tag: ""
    },

    {
        id: 5,
        name: "Tandoori Roti",
        category: "breads",
        price: 25,
        description: "Freshly baked traditional tandoori roti.",
        image: "images/tandoori-roti.jpg",
        tag: ""
    },

    {
        id: 6,
        name: "Veg Biryani",
        category: "rice",
        price: 190,
        description: "Fragrant basmati rice with fresh vegetables and spices.",
        image: "images/veg-biryani.jpg",
        tag: "Popular"
    },

    {
        id: 7,
        name: "Jeera Rice",
        category: "rice",
        price: 130,
        description: "Aromatic basmati rice tempered with cumin.",
        image: "images/jeera-rice.jpg",
        tag: ""
    },

    {
        id: 8,
        name: "Masala Dosa",
        category: "south-indian",
        price: 120,
        description: "Crispy dosa served with masala, sambhar and chutney.",
        image: "images/masala-dosa.jpg",
        tag: "Popular"
    },

    {
        id: 9,
        name: "Idli Sambhar",
        category: "south-indian",
        price: 90,
        description: "Soft steamed idlis served with hot sambhar.",
        image: "images/idli.jpg",
        tag: ""
    },

    {
        id: 10,
        name: "Veg Manchurian",
        category: "chinese",
        price: 180,
        description: "Crispy vegetable balls tossed in Manchurian sauce.",
        image: "images/veg-manchurian.jpg",
        tag: ""
    },

    {
        id: 11,
        name: "Hakka Noodles",
        category: "chinese",
        price: 170,
        description: "Stir-fried noodles with fresh vegetables.",
        image: "images/hakka-noodles.jpg",
        tag: "Popular"
    },

    {
        id: 12,
        name: "Cold Coffee",
        category: "beverages",
        price: 90,
        description: "Chilled creamy coffee served fresh.",
        image: "images/cold-coffee.jpg",
        tag: ""
    },

    {
        id: 13,
        name: "Fresh Lime Soda",
        category: "beverages",
        price: 70,
        description: "Refreshing lime soda with a perfect sweet-sour balance.",
        image: "images/lime-soda.jpg",
        tag: ""
    },

    {
        id: 14,
        name: "Gulab Jamun",
        category: "desserts",
        price: 80,
        description: "Soft warm gulab jamun served with sugar syrup.",
        image: "images/gulab-jamun.jpg",
        tag: "Sweet"
    }
];


/* =========================================================
   2. GLOBAL STATE
========================================================= */

let cart = [];

let currentCategory = "all";

let currentSearch = "";

let toastTimer = null;


/* =========================================================
   3. DOM HELPERS
========================================================= */

const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

const $$ = (selector, parent = document) => {
    return [...parent.querySelectorAll(selector)];
};


/* =========================================================
   4. DOM ELEMENTS
========================================================= */

const siteHeader = $(".site-header");

const searchContainer = $(".search-container");

const searchInput = $(".search-box input");

const clearSearchBtn = $(".clear-search");

const searchBtn = $(".search-btn");

const categoryButtons = $$(".category-btn");

const menuGrid = $(".menu-grid");

const noResults = $(".no-results");

const cartBtn = $(".cart-btn");

const cartCount = $(".cart-count");

const cartDrawer = $(".cart-drawer");

const cartOverlay = $(".cart-overlay");

const closeCartBtn = $(".close-cart");

const cartItems = $(".cart-items");

const emptyCart = $(".empty-cart");

const cartFooter = $(".cart-footer");

const subtotalElement = $(".cart-subtotal");

const totalElement = $(".cart-total");

const checkoutBtn = $(".checkout-btn");

const checkoutModal = $(".modal-backdrop");

const closeModalBtn = $(".close-modal");

const checkoutForm = $("#checkoutForm");

const checkoutItems = $(".checkout-items");

const checkoutTotal = $(".checkout-total");

const successModal = $(".success-modal");

const successCloseBtn = $(".success-close-btn");

const whatsappSuccessBtn = $(".success-whatsapp-btn");

const toast = $(".toast");

const backToTop = $(".back-to-top");

const floatingWhatsapp = $(".floating-whatsapp");


/* =========================================================
   5. FORMAT CURRENCY
========================================================= */

function formatPrice(price) {
    return `₹${Number(price).toLocaleString("en-IN")}`;
}


/* =========================================================
   6. ESCAPE HTML
   ---------------------------------------------------------
   Safety helper for dynamic text.
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   7. GENERATE MENU
========================================================= */

function renderMenu() {

    if (!menuGrid) return;

    /*
       अगर HTML में menu cards पहले से मौजूद हैं,
       तो data से cards generate नहीं करेंगे।
    */

    const existingCards = $$(".menu-card", menuGrid);

    if (existingCards.length > 0) {
        setupExistingMenuCards();
        filterExistingCards();
        return;
    }

    const filteredItems = menuData.filter(item => {

        const categoryMatch =
            currentCategory === "all" ||
            item.category === currentCategory;

        const searchText = currentSearch.toLowerCase().trim();

        const searchMatch =
            !searchText ||
            item.name.toLowerCase().includes(searchText) ||
            item.description.toLowerCase().includes(searchText);

        return categoryMatch && searchMatch;
    });


    menuGrid.innerHTML = "";


    if (filteredItems.length === 0) {

        if (noResults) {
            noResults.hidden = false;
        }

        return;
    }


    if (noResults) {
        noResults.hidden = true;
    }


    filteredItems.forEach((item, index) => {

        const card = document.createElement("article");

        card.className = "menu-card";

        card.dataset.id = item.id;

        card.dataset.category = item.category;

        card.style.animationDelay = `${index * 40}ms`;


        card.innerHTML = `
            <div class="food-image">

                <img
                    src="${escapeHTML(item.image)}"
                    alt="${escapeHTML(item.name)}"
                    loading="lazy"
                    onerror="this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80';"
                >

                ${
                    item.tag
                        ? `<span class="food-tag">${escapeHTML(item.tag)}</span>`
                        : ""
                }

            </div>


            <div class="food-content">

                <div class="food-title-row">

                    <h3>
                        ${escapeHTML(item.name)}
                    </h3>

                    <span class="food-price">
                        ${formatPrice(item.price)}
                    </span>

                </div>


                <p>
                    ${escapeHTML(item.description)}
                </p>


                <button
                    class="add-to-cart"
                    type="button"
                    data-id="${item.id}"
                >
                    <span>Add to Cart</span>

                    <i class="fa-solid fa-plus"></i>
                </button>

            </div>
        `;


        menuGrid.appendChild(card);

    });


    bindAddToCartButtons();
}


/* =========================================================
   8. EXISTING HTML MENU CARDS
========================================================= */

function setupExistingMenuCards() {

    const cards = $$(".menu-card", menuGrid);

    cards.forEach(card => {

        const button = $(".add-to-cart", card);

        if (!button) return;

        if (button.dataset.bound === "true") return;

        button.dataset.bound = "true";

        button.addEventListener("click", () => {

            const id =
                Number(
                    button.dataset.id ||
                    card.dataset.id
                );

            const item = getItemById(id, card);

            if (item) {
                addToCart(item);
            }

        });

    });
}


/* =========================================================
   9. GET ITEM
========================================================= */

function getItemById(id, card = null) {

    const dataItem = menuData.find(
        item => item.id === Number(id)
    );

    if (dataItem) {
        return dataItem;
    }


    /*
       अगर item menuData में नहीं है,
       तो HTML card से information निकालेंगे.
    */

    if (!card) return null;


    const name =
        $(".food-title-row h3", card)?.textContent?.trim() ||
        $(".food-content h3", card)?.textContent?.trim() ||
        "Menu Item";


    const priceText =
        $(".food-price", card)?.textContent?.replace(/[^\d.]/g, "") ||
        "0";


    const description =
        $(".food-content p", card)?.textContent?.trim() ||
        "";


    const image =
        $(".food-image img", card)?.getAttribute("src") ||
        "";


    return {
        id: Number(id),
        name,
        price: Number(priceText) || 0,
        description,
        image
    };
}


/* =========================================================
   10. BIND ADD TO CART
========================================================= */

function bindAddToCartButtons() {

    $$(".add-to-cart", menuGrid).forEach(button => {

        if (button.dataset.bound === "true") return;

        button.dataset.bound = "true";


        button.addEventListener("click", () => {

            const card =
                button.closest(".menu-card");

            const id =
                Number(
                    button.dataset.id ||
                    card?.dataset.id
                );

            const item =
                getItemById(id, card);


            if (!item) {
                showToast("Item information not found");
                return;
            }


            addToCart(item);

        });

    });
}


/* =========================================================
   11. FILTER EXISTING CARDS
========================================================= */

function filterExistingCards() {

    const cards = $$(".menu-card", menuGrid);

    let visibleCount = 0;


    cards.forEach(card => {

        const category =
            card.dataset.category || "all";

        const text =
            card.textContent.toLowerCase();

        const categoryMatch =
            currentCategory === "all" ||
            category === currentCategory;

        const searchMatch =
            !currentSearch ||
            text.includes(currentSearch.toLowerCase());


        const visible =
            categoryMatch &&
            searchMatch;


        card.style.display =
            visible ? "" : "none";


        if (visible) {
            visibleCount++;
        }

    });


    if (noResults) {
        noResults.hidden =
            visibleCount !== 0;
    }

}


/* =========================================================
   12. ADD TO CART
========================================================= */

function addToCart(item) {

    const existing =
        cart.find(
            cartItem => cartItem.id === item.id
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            ...item,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    showToast(`${item.name} cart में add हो गया`);

    openCart();

}


/* =========================================================
   13. REMOVE FROM CART
========================================================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== Number(id)
        );


    saveCart();

    updateCart();

}


/* =========================================================
   14. CHANGE QUANTITY
========================================================= */

function changeQuantity(id, change) {

    const item =
        cart.find(
            cartItem => cartItem.id === Number(id)
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    saveCart();

    updateCart();

}


/* =========================================================
   15. CART TOTAL
========================================================= */

function getCartSubtotal() {

    return cart.reduce(
        (total, item) =>
            total +
            item.price *
            item.quantity,
        0
    );

}


/* =========================================================
   16. UPDATE CART
========================================================= */

function updateCart() {

    const quantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const subtotal =
        getCartSubtotal();


    if (cartCount) {
        cartCount.textContent =
            quantity;
    }


    if (subtotalElement) {
        subtotalElement.textContent =
            formatPrice(subtotal);
    }


    if (totalElement) {
        totalElement.textContent =
            formatPrice(subtotal);
    }


    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.hidden = false;
        }

        if (cartFooter) {
            cartFooter.hidden = true;
        }

        if (cartItems) {
            cartItems.innerHTML = "";
        }

        return;

    }


    if (emptyCart) {
        emptyCart.hidden = true;
    }

    if (cartFooter) {
        cartFooter.hidden = false;
    }


    if (!cartItems) return;


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const row =
            document.createElement("div");

        row.className = "cart-item";


        row.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${escapeHTML(item.image || "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=80")}"
                    alt="${escapeHTML(item.name)}"
                    onerror="this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=80';"
                >

            </div>


            <div class="cart-item-info">

                <h4>
                    ${escapeHTML(item.name)}
                </h4>

                <p>
                    ${formatPrice(item.price)}
                </p>


                <div class="quantity-control">

                    <button
                        type="button"
                        data-action="minus"
                        data-id="${item.id}"
                    >
                        <i class="fa-solid fa-minus"></i>
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        data-action="plus"
                        data-id="${item.id}"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>

            </div>


            <strong class="cart-item-total">
                ${formatPrice(
                    item.price *
                    item.quantity
                )}
            </strong>

        `;


        cartItems.appendChild(row);

    });


    bindCartQuantityButtons();

}


/* =========================================================
   17. CART QUANTITY BUTTONS
========================================================= */

function bindCartQuantityButtons() {

    $$("[data-action]", cartItems)
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    const action =
                        button.dataset.action;


                    changeQuantity(
                        id,
                        action === "plus"
                            ? 1
                            : -1
                    );

                }
            );

        });

}


/* =========================================================
   18. SAVE CART
========================================================= */

function saveCart() {

    try {

        localStorage.setItem(
            "hotelJatashankarCart",
            JSON.stringify(cart)
        );

    } catch (error) {

        console.warn(
            "Cart save failed:",
            error
        );

    }

}


/* =========================================================
   19. LOAD CART
========================================================= */

function loadCart() {

    try {

        const saved =
            localStorage.getItem(
                "hotelJatashankarCart"
            );


        if (saved) {

            const parsed =
                JSON.parse(saved);


            if (Array.isArray(parsed)) {

                cart = parsed;

            }

        }

    } catch (error) {

        cart = [];

        console.warn(
            "Cart load failed:",
            error
        );

    }

}


/* =========================================================
   20. OPEN CART
========================================================= */

function openCart() {

    if (!cartDrawer) return;


    cartDrawer.classList.add("open");


    if (cartOverlay) {
        cartOverlay.hidden = false;
    }


    document.body.classList.add(
        "cart-open"
    );

}


/* =========================================================
   21. CLOSE CART
========================================================= */

function closeCart() {

    if (!cartDrawer) return;


    cartDrawer.classList.remove("open");


    if (cartOverlay) {
        cartOverlay.hidden = true;
    }


    document.body.classList.remove(
        "cart-open"
    );

}


/* =========================================================
   22. OPEN CHECKOUT
========================================================= */

function openCheckout() {

    if (cart.length === 0) {

        showToast(
            "पहले cart में item add करें"
        );

        return;
    }


    renderCheckoutSummary();


    closeCart();


    if (checkoutModal) {

        checkoutModal.hidden = false;

    }


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   23. CLOSE CHECKOUT
========================================================= */

function closeCheckout() {

    if (checkoutModal) {

        checkoutModal.hidden = true;

    }


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   24. CHECKOUT SUMMARY
========================================================= */

function renderCheckoutSummary() {

    if (!checkoutItems) return;


    checkoutItems.innerHTML = "";


    cart.forEach(item => {

        const row =
            document.createElement("div");

        row.className =
            "checkout-item";


        row.innerHTML = `

            <span>
                ${escapeHTML(item.name)}
                × ${item.quantity}
            </span>

            <strong>
                ${formatPrice(
                    item.price *
                    item.quantity
                )}
            </strong>

        `;


        checkoutItems.appendChild(row);

    });


    if (checkoutTotal) {

        checkoutTotal.textContent =
            formatPrice(
                getCartSubtotal()
            );

    }

}


/* =========================================================
   25. GENERATE ORDER NUMBER
========================================================= */

function generateOrderNumber() {

    const now =
        new Date();


    const date =
        now.getFullYear().toString().slice(-2) +
        String(
            now.getMonth() + 1
        ).padStart(2, "0") +
        String(
            now.getDate()
        ).padStart(2, "0");


    const random =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return `HJ${date}${random}`;

}


/* =========================================================
   26. WHATSAPP NUMBER
   ---------------------------------------------------------
   Demo number.
   बाद में hotel का actual WhatsApp number डालें.
========================================================= */

const HOTEL_WHATSAPP =
    "919999999999";


/* =========================================================
   27. CREATE WHATSAPP MESSAGE
========================================================= */

function createWhatsAppMessage(orderNumber = "") {

    const name =
        $("#customerName")?.value?.trim() ||
        "Customer";


    const phone =
        $("#customerPhone")?.value?.trim() ||
        "";


    const orderType =
        $('input[name="orderType"]:checked')?.value ||
        "Dine In";


    const payment =
        $('input[name="paymentMethod"]:checked')?.value ||
        "Cash";


    const address =
        $("#customerAddress")?.value?.trim() ||
        "";


    const notes =
        $("#orderNotes")?.value?.trim() ||
        "";


    let message =
        `*HOTEL JATASHANKAR*\n`;


    message +=
        `Chhatarpur, Madhya Pradesh\n\n`;


    message +=
        `*Order:* ${orderNumber || "New Order"}\n`;


    message +=
        `*Customer:* ${name}\n`;


    if (phone) {
        message +=
            `*Mobile:* ${phone}\n`;
    }


    message +=
        `*Order Type:* ${orderType}\n`;


    message +=
        `*Payment:* ${payment}\n\n`;


    message +=
        `*ORDER ITEMS*\n`;


    cart.forEach(item => {

        message +=
            `• ${item.name} × ${item.quantity} = ${formatPrice(
                item.price *
                item.quantity
            )}\n`;

    });


    message +=
        `\n*TOTAL: ${formatPrice(
            getCartSubtotal()
        )}*\n`;


    if (address) {

        message +=
            `\n*Address:* ${address}\n`;

    }


    if (notes) {

        message +=
            `*Note:* ${notes}\n`;

    }


    message +=
        `\nThank you for ordering from Hotel Jatashankar.`;



    return message;

}


/* =========================================================
   28. OPEN WHATSAPP
========================================================= */

function openWhatsApp(message) {

    const encoded =
        encodeURIComponent(message);


    const url =
        `https://wa.me/${HOTEL_WHATSAPP}?text=${encoded}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   29. PLACE ORDER
========================================================= */

function placeOrder() {

    if (cart.length === 0) {

        showToast(
            "Cart खाली है"
        );

        return;

    }


    if (!checkoutForm) return;


    if (!checkoutForm.checkValidity()) {

        checkoutForm.reportValidity();

        return;

    }


    const orderNumber =
        generateOrderNumber();


    /*
       Demo order save
    */

    const order = {

        orderNumber,

        customerName:
            $("#customerName")?.value?.trim() || "",

        customerPhone:
            $("#customerPhone")?.value?.trim() || "",

        orderType:
            $('input[name="orderType"]:checked')?.value || "",

        paymentMethod:
            $('input[name="paymentMethod"]:checked')?.value || "",

        address:
            $("#customerAddress")?.value?.trim() || "",

        notes:
            $("#orderNotes")?.value?.trim() || "",

        items: [...cart],

        total: getCartSubtotal(),

        createdAt:
            new Date().toISOString()

    };


    try {

        localStorage.setItem(
            "lastHotelJatashankarOrder",
            JSON.stringify(order)
        );

    } catch (error) {

        console.warn(
            "Order save failed:",
            error
        );

    }


    showSuccessModal(orderNumber);

}


/* =========================================================
   30. SUCCESS MODAL
========================================================= */

let lastOrderNumber = "";


function showSuccessModal(orderNumber) {

    lastOrderNumber =
        orderNumber;


    closeCheckout();


    if (successModal) {

        successModal.hidden = false;

    }


    document.body.classList.add(
        "modal-open"
    );


    const orderNumberElement =
        $(".success-order-number strong");


    if (orderNumberElement) {

        orderNumberElement.textContent =
            orderNumber;

    }

}


/* =========================================================
   31. CLOSE SUCCESS MODAL
========================================================= */

function closeSuccessModal() {

    if (successModal) {

        successModal.hidden = true;

    }


    document.body.classList.remove(
        "modal-open"
    );


    cart = [];

    saveCart();

    updateCart();

}


/* =========================================================
   32. DEMO PAYMENT
========================================================= */

function demoPayment() {

    if (cart.length === 0) {

        showToast(
            "Cart खाली है"
        );

        return;

    }


    const total =
        formatPrice(
            getCartSubtotal()
        );


    alert(
        `DEMO PAYMENT\n\nAmount: ${total}\n\nReal payment gateway अभी connect नहीं है.`
    );

}


/* =========================================================
   33. SEARCH
========================================================= */

function performSearch() {

    currentSearch =
        searchInput?.value?.trim() || "";


    if (clearSearchBtn) {

        clearSearchBtn.classList.toggle(
            "active",
            Boolean(currentSearch)
        );

    }


    renderMenu();

}


/* =========================================================
   34. CATEGORY FILTER
========================================================= */

function selectCategory(button) {

    categoryButtons.forEach(btn => {

        btn.classList.remove(
            "active"
        );

    });


    button.classList.add(
        "active"
    );


    currentCategory =
        button.dataset.category ||
        "all";


    renderMenu();


    /*
       Mobile पर selected category
       थोड़ा visible रखने के लिए.
    */

    if (
        window.innerWidth < 600
    ) {

        button.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });

    }

}


/* =========================================================
   35. SEARCH BUTTON
========================================================= */

function toggleSearch() {

    if (!searchContainer) return;


    searchContainer.classList.toggle(
        "active"
    );


    if (
        searchContainer.classList.contains(
            "active"
        )
    ) {

        setTimeout(() => {

            searchInput?.focus();

        }, 100);

    } else {

        if (searchInput) {

            searchInput.value = "";

        }

        currentSearch = "";

        clearSearchBtn?.classList.remove(
            "active"
        );

        renderMenu();

    }

}


/* =========================================================
   36. CLEAR SEARCH
========================================================= */

function clearSearch() {

    if (searchInput) {

        searchInput.value = "";

    }


    currentSearch = "";


    clearSearchBtn?.classList.remove(
        "active"
    );


    renderMenu();


    searchInput?.focus();

}


/* =========================================================
   37. TOAST
========================================================= */

function showToast(message) {

    if (!toast) return;


    const toastText =
        $(".toast-message", toast);


    if (toastText) {

        toastText.textContent =
            message;

    } else {

        toast.textContent =
            message;

    }


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);

}


/* =========================================================
   38. HEADER SCROLL
========================================================= */

function handleHeaderScroll() {

    if (!siteHeader) return;


    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 20
    );


    if (backToTop) {

        backToTop.classList.toggle(
            "show",
            window.scrollY > 500
        );

    }

}


/* =========================================================
   39. BACK TO TOP
========================================================= */

function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   40. EVENT LISTENERS
========================================================= */


/* Search */

searchBtn?.addEventListener(
    "click",
    toggleSearch
);


searchInput?.addEventListener(
    "input",
    performSearch
);


clearSearchBtn?.addEventListener(
    "click",
    clearSearch
);


/* Categories */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => selectCategory(button)
    );

});


/* Cart */

cartBtn?.addEventListener(
    "click",
    openCart
);


closeCartBtn?.addEventListener(
    "click",
    closeCart
);


cartOverlay?.addEventListener(
    "click",
    closeCart
);


/* Checkout */

checkoutBtn?.addEventListener(
    "click",
    openCheckout
);


closeModalBtn?.addEventListener(
    "click",
    closeCheckout
);


/* Form */

checkoutForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        placeOrder();

    }
);


/* Demo Payment */

$(".demo-payment-btn")
    ?.addEventListener(
        "click",
        demoPayment
    );


/* Success */

successCloseBtn?.addEventListener(
    "click",
    closeSuccessModal
);


/* Success WhatsApp */

whatsappSuccessBtn?.addEventListener(
    "click",
    () => {

        const message =
            createWhatsAppMessage(
                lastOrderNumber
            );


        openWhatsApp(
            message
        );

    }
);


/* Floating WhatsApp */

floatingWhatsapp?.addEventListener(
    "click",
    event => {

        event.preventDefault();


        const message =
            `Hello Hotel Jatashankar, mujhe menu/order ke regarding information chahiye.`;


        openWhatsApp(
            message
        );

    }
);


/* Back to top */

backToTop?.addEventListener(
    "click",
    scrollToTop
);


/* Scroll */

window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);


/* =========================================================
   41. ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        closeCart();

        closeCheckout();

        closeSuccessModal();

    }
);


/* =========================================================
   42. MODAL BACKDROP CLICK
========================================================= */

checkoutModal?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            checkoutModal
        ) {

            closeCheckout();

        }

    }
);


successModal?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            successModal
        ) {

            closeSuccessModal();

        }

    }
);


/* =========================================================
   43. INIT
========================================================= */

function init() {

    loadCart();

    renderMenu();

    updateCart();

    handleHeaderScroll();

}


/* =========================================================
   44. START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    init
);
