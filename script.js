/* =====================================================
   HOTEL JATASHANKAR DIGITAL QR MENU
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       CONFIG
    ================================================= */

    const MENU_URL =
        "https://aashish0905.github.io/QR-Menu-Card/";

    /*
      IMPORTANT:
      Replace this demo number with the hotel's
      real WhatsApp number.

      Example:
      917000000000
    */

    const WHATSAPP_NUMBER =
        "919999999999";


    /* =================================================
       MENU DATA
    ================================================= */

    const menuItems = [

        {
            id: 1,
            name: "Paneer Tikka",
            category: "starters",
            price: 220,
            emoji: "🥘",
            description: "Soft paneer with aromatic spices."
        },

        {
            id: 2,
            name: "Veg Manchurian",
            category: "chinese",
            price: 180,
            emoji: "🥢",
            description: "Crispy vegetable balls in Manchurian sauce."
        },

        {
            id: 3,
            name: "Paneer Butter Masala",
            category: "north-indian",
            price: 240,
            emoji: "🍛",
            description: "Creamy tomato gravy with soft paneer."
        },

        {
            id: 4,
            name: "Dal Tadka",
            category: "north-indian",
            price: 160,
            emoji: "🥣",
            description: "Yellow dal tempered with Indian spices."
        },

        {
            id: 5,
            name: "Butter Naan",
            category: "breads",
            price: 45,
            emoji: "🫓",
            description: "Soft naan topped with butter."
        },

        {
            id: 6,
            name: "Garlic Naan",
            category: "breads",
            price: 60,
            emoji: "🫓",
            description: "Tandoori naan with garlic and coriander."
        },

        {
            id: 7,
            name: "Veg Fried Rice",
            category: "rice",
            price: 180,
            emoji: "🍚",
            description: "Fragrant rice tossed with fresh vegetables."
        },

        {
            id: 8,
            name: "Jeera Rice",
            category: "rice",
            price: 130,
            emoji: "🍚",
            description: "Basmati rice tempered with cumin."
        },

        {
            id: 9,
            name: "Cold Coffee",
            category: "beverages",
            price: 120,
            emoji: "🥤",
            description: "Creamy chilled coffee."
        },

        {
            id: 10,
            name: "Fresh Lime Soda",
            category: "beverages",
            price: 80,
            emoji: "🍋",
            description: "Refreshing lemon soda."
        },

        {
            id: 11,
            name: "Gulab Jamun",
            category: "desserts",
            price: 90,
            emoji: "🍮",
            description: "Soft gulab jamun served warm."
        },

        {
            id: 12,
            name: "Ice Cream",
            category: "desserts",
            price: 100,
            emoji: "🍨",
            description: "Creamy chilled ice cream."
        }

    ];


    /* =================================================
       DOM
    ================================================= */

    const menuGrid =
        document.getElementById("menuGrid");

    const searchInput =
        document.getElementById("menuSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const noResults =
        document.getElementById("noResults");

    const resetMenu =
        document.getElementById("resetMenu");

    const cartOpenBtn =
        document.getElementById("cartOpenBtn");

    const cartCloseBtn =
        document.getElementById("cartCloseBtn");

    const cartDrawer =
        document.getElementById("cartDrawer");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartItemsContainer =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const emptyCart =
        document.getElementById("emptyCart");

    const cartFooter =
        document.getElementById("cartFooter");

    const cartSubtotal =
        document.getElementById("cartSubtotal");

    const cartTax =
        document.getElementById("cartTax");

    const cartTotal =
        document.getElementById("cartTotal");

    const checkoutBtn =
        document.getElementById("checkoutBtn");

    const startOrdering =
        document.getElementById("startOrdering");

    const checkoutModal =
        document.getElementById("checkoutModal");

    const checkoutCloseBtn =
        document.getElementById("checkoutCloseBtn");

    const checkoutForm =
        document.getElementById("checkoutForm");

    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutTotal =
        document.getElementById("checkoutTotal");

    const successModal =
        document.getElementById("successModal");

    const successCloseBtn =
        document.getElementById("successCloseBtn");

    const successWhatsappBtn =
        document.getElementById("successWhatsappBtn");

    const orderIdElement =
        document.getElementById("orderId");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =================================================
       CART
    ================================================= */

    let cart =
        JSON.parse(
            localStorage.getItem("hotelJatashankarCart")
        ) || [];


    let selectedCategory = "all";

    let lastOrderMessage = "";


    /* =================================================
       SAVE CART
    ================================================= */

    function saveCart() {

        localStorage.setItem(
            "hotelJatashankarCart",
            JSON.stringify(cart)
        );

    }


    /* =================================================
       FORMAT PRICE
    ================================================= */

    function money(amount) {

        return "₹" +
            Number(amount).toLocaleString("en-IN");

    }


    /* =================================================
       RENDER MENU
    ================================================= */

    function renderMenu() {

        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();


        const filtered =
            menuItems.filter(item => {

                const matchesCategory =
                    selectedCategory === "all" ||
                    item.category === selectedCategory;


                const matchesSearch =
                    item.name
                        .toLowerCase()
                        .includes(searchTerm);


                return (
                    matchesCategory &&
                    matchesSearch
                );

            });


        menuGrid.innerHTML = "";


        if (filtered.length === 0) {

            noResults.classList.add("show");

            return;

        }


        noResults.classList.remove("show");


        filtered.forEach(item => {

            const card =
                document.createElement("article");

            card.className = "menu-card";

            card.innerHTML = `

                <div class="food-image">
                    ${item.emoji}
                </div>

                <div class="food-content">

                    <span class="food-tag">
                        ${formatCategory(item.category)}
                    </span>

                    <div class="food-title-row">

                        <h3>
                            ${item.name}
                        </h3>

                        <span class="food-price">
                            ${money(item.price)}
                        </span>

                    </div>

                    <p class="food-description">
                        ${item.description}
                    </p>

                    <button
                        class="add-to-cart"
                        data-id="${item.id}"
                        type="button"
                    >
                        + Add to Cart
                    </button>

                </div>

            `;


            menuGrid.appendChild(card);

        });

    }


    /* =================================================
       CATEGORY NAME
    ================================================= */

    function formatCategory(category) {

        const names = {

            "starters": "Starters",

            "north-indian": "North Indian",

            "chinese": "Chinese",

            "breads": "Breads",

            "rice": "Rice",

            "beverages": "Beverages",

            "desserts": "Desserts"

        };

        return names[category] || category;

    }


    /* =================================================
       ADD TO CART
    ================================================= */

    function addToCart(id) {

        const item =
            menuItems.find(
                product => product.id === id
            );


        if (!item) return;


        const existing =
            cart.find(
                product => product.id === id
            );


        if (existing) {

            existing.quantity += 1;

        } else {

            cart.push({

                id: item.id,

                name: item.name,

                price: item.price,

                quantity: 1

            });

        }


        saveCart();

        updateCart();

        showToast(
            `${item.name} added to cart`
        );

    }


    /* =================================================
       REMOVE / QUANTITY
    ================================================= */

    function changeQuantity(id, amount) {

        const item =
            cart.find(
                product => product.id === id
            );


        if (!item) return;


        item.quantity += amount;


        if (item.quantity <= 0) {

            cart =
                cart.filter(
                    product => product.id !== id
                );

        }


        saveCart();

        updateCart();

    }


    /* =================================================
       CART TOTALS
    ================================================= */

    function getSubtotal() {

        return cart.reduce(
            (total, item) =>
                total +
                item.price * item.quantity,
            0
        );

    }


    function getTax() {

        /*
          Demo tax:
          5%
        */

        return Math.round(
            getSubtotal() * 0.05
        );

    }


    function getTotal() {

        return getSubtotal() + getTax();

    }


    /* =================================================
       UPDATE CART
    ================================================= */

    function updateCart() {

        const quantity =
            cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            );


        cartCount.textContent =
            quantity;


        cartItemsContainer.innerHTML = "";


        if (cart.length === 0) {

            emptyCart.classList.add("show");

            cartFooter.style.display = "none";

            return;

        }


        emptyCart.classList.remove("show");

        cartFooter.style.display = "block";


        cart.forEach(item => {

            const element =
                document.createElement("div");

            element.className = "cart-item";


            element.innerHTML = `

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ${money(
                            item.price * item.quantity
                        )}
                    </p>

                </div>


                <div class="cart-controls">

                    <button
                        type="button"
                        data-action="minus"
                        data-id="${item.id}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        data-action="plus"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>

            `;


            cartItemsContainer.appendChild(element);

        });


        const subtotal =
            getSubtotal();

        const tax =
            getTax();

        const total =
            getTotal();


        cartSubtotal.textContent =
            money(subtotal);

        cartTax.textContent =
            money(tax);

        cartTotal.textContent =
            money(total);

    }


    /* =================================================
       CART EVENTS
    ================================================= */

    menuGrid.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".add-to-cart"
                );


            if (!button) return;


            addToCart(
                Number(button.dataset.id)
            );

        }
    );


    cartItemsContainer.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest("button");


            if (!button) return;


            const id =
                Number(button.dataset.id);


            if (
                button.dataset.action === "plus"
            ) {

                changeQuantity(id, 1);

            }


            if (
                button.dataset.action === "minus"
            ) {

                changeQuantity(id, -1);

            }

        }
    );


    /* =================================================
       OPEN CART
    ================================================= */

    function openCart() {

        cartDrawer.classList.add("active");

        cartOverlay.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function closeCart() {

        cartDrawer.classList.remove("active");

        cartOverlay.classList.remove("active");

        document.body.style.overflow = "";

    }


    cartOpenBtn.addEventListener(
        "click",
        openCart
    );


    cartCloseBtn.addEventListener(
        "click",
        closeCart
    );


    cartOverlay.addEventListener(
        "click",
        closeCart
    );


    startOrdering.addEventListener(
        "click",
        () => {

            closeCart();

            document
                .getElementById("menu")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /* =================================================
       SEARCH
    ================================================= */

    searchInput.addEventListener(
        "input",
        renderMenu
    );


    clearSearch.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            renderMenu();

            searchInput.focus();

        }
    );


    /* =================================================
       CATEGORY
    ================================================= */

    categoryButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                categoryButtons.forEach(btn =>
                    btn.classList.remove("active")
                );


                button.classList.add("active");


                selectedCategory =
                    button.dataset.category;


                renderMenu();

            }
        );

    });


    resetMenu.addEventListener(
        "click",
        () => {

            selectedCategory = "all";

            searchInput.value = "";


            categoryButtons.forEach(btn =>
                btn.classList.remove("active")
            );


            document
                .querySelector(
                    '.category-btn[data-category="all"]'
                )
                .classList.add("active");


            renderMenu();

        }
    );


    /* =================================================
       CHECKOUT
    ================================================= */

    checkoutBtn.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "Your cart is empty"
                );

                return;

            }


            renderCheckout();

            checkoutModal.classList.add("active");

        }
    );


    checkoutCloseBtn.addEventListener(
        "click",
        () => {

            checkoutModal.classList.remove(
                "active"
            );

        }
    );


    /* =================================================
       CHECKOUT SUMMARY
    ================================================= */

    function renderCheckout() {

        checkoutItems.innerHTML = "";


        cart.forEach(item => {

            const row =
                document.createElement("div");

            row.className =
                "checkout-item";


            row.innerHTML = `

                <span>
                    ${item.name}
                    × ${item.quantity}
                </span>

                <strong>
                    ${money(
                        item.price *
                        item.quantity
                    )}
                </strong>

            `;


            checkoutItems.appendChild(row);

        });


        checkoutTotal.textContent =
            money(getTotal());

    }


    /* =================================================
       PLACE ORDER
    ================================================= */

    checkoutForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (cart.length === 0) {

                showToast(
                    "Please add items first"
                );

                return;

            }


            const name =
                document
                    .getElementById(
                        "customerName"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "customerPhone"
                    )
                    .value
                    .trim();


            const address =
                document
                    .getElementById(
                        "customerAddress"
                    )
                    .value
                    .trim();


            const orderType =
                document.querySelector(
                    'input[name="orderType"]:checked'
                ).value;


            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                ).value;


            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10 digit mobile number."
                );

                return;

            }


            const orderID =
                "HJ" +
                Date.now()
                    .toString()
                    .slice(-6);


            const itemLines =
                cart.map(item => {

                    return (
                        `• ${item.name} x ${item.quantity}` +
                        ` = ${money(
                            item.price *
                            item.quantity
                        )}`
                    );

                }).join("\n");


            lastOrderMessage =

                `*Hotel Jatashankar Order*\n\n` +

                `Order ID: ${orderID}\n` +

                `Name: ${name}\n` +

                `Phone: ${phone}\n` +

                `Order Type: ${orderType}\n` +

                `Address/Table: ${
                    address || "Not provided"
                }\n\n` +

                `*Items:*\n` +

                `${itemLines}\n\n` +

                `Subtotal: ${money(
                    getSubtotal()
                )}\n` +

                `Tax: ${money(
                    getTax()
                )}\n` +

                `*Total: ${money(
                    getTotal()
                )}*\n\n` +

                `Payment: ${payment}`;


            orderIdElement.textContent =
                orderID;


            checkoutModal.classList.remove(
                "active"
            );


            closeCart();


            successModal.classList.add(
                "active"
            );


            localStorage.setItem(
                "lastHotelOrder",
                JSON.stringify({
                    orderID,
                    name,
                    phone,
                    address,
                    orderType,
                    payment,
                    cart,
                    total: getTotal()
                })
            );


            /*
              Keep cart after order for demo.
              You can clear it after successful backend order.
            */

        }
    );


    /* =================================================
       WHATSAPP ORDER
    ================================================= */

    successWhatsappBtn.addEventListener(
        "click",
        () => {

            const url =
                `https://wa.me/${WHATSAPP_NUMBER}` +
                `?text=${encodeURIComponent(
                    lastOrderMessage
                )}`;


            window.open(
                url,
                "_blank",
                "noopener"
            );

        }
    );


    successCloseBtn.addEventListener(
        "click",
        () => {

            successModal.classList.remove(
                "active"
            );

        }
    );


    /* =================================================
       QR CODE
    ================================================= */

    function generateQR(
        containerID,
        size = 250
    ) {

        const container =
            document.getElementById(
                containerID
            );


        if (!container) return;


        container.innerHTML = "";


        if (
            typeof QRCode ===
            "undefined"
        ) {

            container.innerHTML = `
                <p style="
                    color:#777;
                    font-size:12px;
                ">
                    QR loading...
                </p>
            `;

            return;

        }


        new QRCode(
            container,
            {
                text: MENU_URL,

                width: size,
                height: size,

                colorDark: "#111111",

                colorLight: "#ffffff",

                correctLevel:
                    QRCode.CorrectLevel.H
            }
        );

    }


    /*
      Main QR
    */

    generateQR(
        "qrCode",
        250
    );


    /* =================================================
       QR POPUP
    ================================================= */

    const qrModal =
        document.getElementById("qrModal");

    const openQRBtn =
        document.getElementById("openQRBtn");

    const heroQRBtn =
        document.getElementById("heroQRBtn");

    const footerQRBtn =
        document.getElementById("footerQRBtn");

    const qrModalClose =
        document.getElementById("qrModalClose");

    const downloadPopupQR =
        document.getElementById(
            "downloadPopupQR"
        );


    function openQRModal() {

        generateQR(
            "popupQR",
            230
        );

        qrModal.classList.add(
            "active"
        );

    }


    function closeQRModal() {

        qrModal.classList.remove(
            "active"
        );

    }


    openQRBtn.addEventListener(
        "click",
        openQRModal
    );


    heroQRBtn.addEventListener(
        "click",
        openQRModal
    );


    footerQRBtn.addEventListener(
        "click",
        openQRModal
    );


    qrModalClose.addEventListener(
        "click",
        closeQRModal
    );


    /* =================================================
       DOWNLOAD MAIN QR
    ================================================= */

    document
        .getElementById("downloadQRBtn")
        .addEventListener(
            "click",
            () => {

                downloadQR(
                    "qrCode",
                    "Hotel-Jatashankar-QR-Menu.png"
                );

            }
        );


    /* =================================================
       DOWNLOAD POPUP QR
    ================================================= */

    downloadPopupQR.addEventListener(
        "click",
        () => {

            downloadQR(
                "popupQR",
                "Hotel-Jatashankar-QR-Menu.png"
            );

        }
    );


    function downloadQR(
        containerID,
        filename
    ) {

        const container =
            document.getElementById(
                containerID
            );


        if (!container) return;


        const canvas =
            container.querySelector(
                "canvas"
            );


        const image =
            container.querySelector(
                "img"
            );


        let url = null;


        if (canvas) {

            url =
                canvas.toDataURL(
                    "image/png"
                );

        } else if (image) {

            url =
                image.src;

        }


        if (!url) {

            alert(
                "QR code is not ready yet."
            );

            return;

        }


        const link =
            document.createElement("a");


        link.href = url;

        link.download = filename;


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );

    }


    /* =================================================
       TOAST
    ================================================= */

    let toastTimer;


    function showToast(message) {

        toastMessage.textContent =
            message;


        toast.classList.add(
            "show"
        );


        clearTimeout(
            toastTimer
        );


        toastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2500
            );

    }


    /* =================================================
       YEAR
    ================================================= */

    document
        .getElementById("currentYear")
        .textContent =
            new Date().getFullYear();


    /* =================================================
       ESC KEY
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            closeCart();


            checkoutModal.classList.remove(
                "active"
            );


            successModal.classList.remove(
                "active"
            );


            qrModal.classList.remove(
                "active"
            );

        }
    );


    /* =================================================
       INITIAL LOAD
    ================================================= */

    renderMenu();

    updateCart();

});
