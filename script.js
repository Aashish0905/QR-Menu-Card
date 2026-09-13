/* =========================================================
   AASHISH SANDWICH™
   DIGITAL QR MENU + WHATSAPP ORDERING + BILLING
========================================================= */


/* =========================
   SETTINGS
========================= */

const MENU_URL =
  window.location.href.split("#")[0];

const WHATSAPP_NUMBER =
  "919074755317";

/*
   Demo charge.

   0 = no tax/charge
   0.05 = 5%

   Important:
   This is only a demo "Tax / Charges" value.
   Do not present it as GST unless properly configured.
*/
const TAX_RATE = 0.05;


/* =========================
   MENU DATA
========================= */

const menu = [

  {
    id: 1,

    name:
      "Paneer Sweet Corn Cheese Sandwich",

    category:
      "sandwich",

    price:
      129,

    desc:
      "Grilled sandwich loaded with paneer, sweet corn and melted cheese.",

    badge:
      "BEST SELLER",

    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=82"
  },


  {
    id: 2,

    name:
      "Classic Cheese Sandwich",

    category:
      "sandwich",

    price:
      99,

    desc:
      "Crispy grilled bread with creamy, melty cheese filling.",

    badge:
      "POPULAR",

    image:
      "https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&w=700&q=82"
  },


  {
    id: 3,

    name:
      "Veg Grilled Sandwich",

    category:
      "sandwich",

    price:
      89,

    desc:
      "Fresh vegetables, herbs and cheese in a crispy grilled sandwich.",

    badge:
      "",

    image:
      "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=700&q=82"
  },


  {
    id: 4,

    name:
      "Cold Coffee",

    category:
      "drinks",

    price:
      89,

    desc:
      "Creamy chilled cold coffee — the perfect pairing for your sandwich.",

    badge:
      "COLD & CREAMY",

    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=82"
  },


  {
    id: 5,

    name:
      "Chocolate Cold Coffee",

    category:
      "drinks",

    price:
      109,

    desc:
      "Rich chocolate and chilled coffee blended into a smooth treat.",

    badge:
      "",

    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=82"
  },


  {
    id: 6,

    name:
      "Sandwich + Cold Coffee Combo",

    category:
      "combos",

    price:
      199,

    desc:
      "Your favourite grilled sandwich paired with a chilled cold coffee.",

    badge:
      "COMBO",

    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=700&q=82"
  },


  {
    id: 7,

    name:
      "Extra Cheese",

    category:
      "addons",

    price:
      20,

    desc:
      "Add extra cheese to make your sandwich even more indulgent.",

    badge:
      "ADD-ON",

    image:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=700&q=82"
  },


  {
    id: 8,

    name:
      "Extra Filling",

    category:
      "addons",

    price:
      20,

    desc:
      "Add extra filling to your favourite sandwich.",

    badge:
      "ADD-ON",

    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=82"
  }

];


/* =========================
   CART
========================= */

let cart =
  JSON.parse(
    localStorage.getItem(
      "aashishSandwichCart"
    ) || "[]"
  );


/* =========================
   HELPERS
========================= */

const $ =
  selector =>
    document.querySelector(selector);

const $$ =
  selector =>
    [...document.querySelectorAll(selector)];

const money =
  number =>
    `₹${Math.round(number).toLocaleString("en-IN")}`;


/* =========================
   SAVE CART
========================= */

function saveCart() {

  localStorage.setItem(
    "aashishSandwichCart",
    JSON.stringify(cart)
  );

}


/* =========================
   CART QUANTITY
========================= */

function cartQty() {

  return cart.reduce(
    (total, item) =>
      total + item.qty,
    0
  );

}


/* =========================
   RENDER MENU
========================= */

function renderMenu() {

  const grid =
    $("#menuGrid");

  const search =
    ($("#searchInput").value || "")
      .toLowerCase()
      .trim();

  const active =
    $(".category.active")?.dataset.category ||
    "all";


  const filtered =
    menu.filter(item => {

      const categoryMatch =
        active === "all" ||
        item.category === active;


      const searchMatch =
        !search ||
        `${item.name} ${item.desc}`
          .toLowerCase()
          .includes(search);


      return (
        categoryMatch &&
        searchMatch
      );

    });


  grid.innerHTML =
    filtered.map(item => `

      <article class="menu-card">

        <div class="food-image">

          <img
            src="${item.image}"
            alt="${item.name}"
            loading="lazy"
          >

          ${
            item.badge
              ? `
                <span class="badge">
                  ${item.badge}
                </span>
              `
              : ""
          }

        </div>


        <div class="menu-info">

          <h3>
            ${item.name}
          </h3>

          <p>
            ${item.desc}
          </p>


          <div class="menu-bottom">

            <strong class="price">
              ${money(item.price)}
            </strong>

            <button
              class="add-btn"
              data-add="${item.id}"
            >
              Add +
            </button>

          </div>

        </div>

      </article>

    `).join("");


  $("#emptyState").style.display =
    filtered.length
      ? "none"
      : "block";

}


/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

  const item =
    menu.find(
      x => x.id === id
    );

  if (!item) return;


  const existing =
    cart.find(
      x => x.id === id
    );


  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      id: item.id,
      qty: 1
    });

  }


  saveCart();

  renderCart();

  showToast(
    `${item.name} added to cart`
  );

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQty(
  id,
  delta
) {

  const item =
    cart.find(
      x => x.id === id
    );

  if (!item) return;


  item.qty += delta;


  if (item.qty <= 0) {

    cart =
      cart.filter(
        x => x.id !== id
      );

  }


  saveCart();

  renderCart();

}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(id) {

  cart =
    cart.filter(
      x => x.id !== id
    );


  saveCart();

  renderCart();

}


/* =========================
   TOTALS
========================= */

function totals() {

  const subtotal =
    cart.reduce(
      (sum, row) => {

        const item =
          menu.find(
            x => x.id === row.id
          );

        return (
          sum +
          item.price *
          row.qty
        );

      },
      0
    );


  const tax =
    Math.round(
      subtotal * TAX_RATE
    );


  const total =
    subtotal + tax;


  return {
    subtotal,
    tax,
    total
  };

}


/* =========================
   RENDER CART
========================= */

function renderCart() {

  const items =
    $("#cartItems");

  const empty =
    $("#cartEmpty");

  const summary =
    $("#cartSummary");


  const count =
    cartQty();


  $$(".cart-count")
    .forEach(
      element => {
        element.textContent =
          count;
      }
    );


  if (!cart.length) {

    items.innerHTML = "";

    empty.style.display =
      "block";

    summary.style.display =
      "none";

    return;

  }


  empty.style.display =
    "none";

  summary.style.display =
    "block";


  items.innerHTML =
    cart.map(row => {

      const item =
        menu.find(
          x => x.id === row.id
        );


      return `

        <div class="cart-row">

          <img
            src="${item.image}"
            alt="${item.name}"
          >


          <div>

            <h4>
              ${item.name}
            </h4>

            <small>
              ${money(item.price)}
              × ${row.qty}
            </small>


            <div class="qty">

              <button
                data-minus="${item.id}"
              >
                −
              </button>


              <strong>
                ${row.qty}
              </strong>


              <button
                data-plus="${item.id}"
              >
                +
              </button>


              <button
                class="remove"
                data-remove="${item.id}"
              >
                Remove
              </button>

            </div>

          </div>


          <strong>
            ${money(
              item.price *
              row.qty
            )}
          </strong>

        </div>

      `;

    }).join("");


  const total =
    totals();


  $("#subtotal").textContent =
    money(total.subtotal);

  $("#tax").textContent =
    money(total.tax);

  $("#grandTotal").textContent =
    money(total.total);

  $("#checkoutTotal").textContent =
    money(total.total);

}


/* =========================
   CART OPEN
========================= */

function openCart() {

  $("#cartDrawer")
    .classList
    .add("open");


  $("#overlay")
    .classList
    .add("show");


  $("#cartDrawer")
    .setAttribute(
      "aria-hidden",
      "false"
    );

}


/* =========================
   CART CLOSE
========================= */

function closeCart() {

  $("#cartDrawer")
    .classList
    .remove("open");


  $("#overlay")
    .classList
    .remove("show");


  $("#cartDrawer")
    .setAttribute(
      "aria-hidden",
      "true"
    );

}


/* =========================
   MODALS
========================= */

function openModal(id) {

  $(id)
    .classList
    .add("show");

}


function closeModals() {

  $$(".modal-wrap")
    .forEach(
      modal =>
        modal.classList
          .remove("show")
    );

}


/* =========================
   TOAST
========================= */

function showToast(text) {

  const toast =
    $("#toast");


  toast.textContent =
    text;


  toast.classList
    .add("show");


  setTimeout(
    () =>
      toast.classList
        .remove("show"),
    2600
  );

}


/* =========================
   QR GENERATOR
========================= */

function generateQr(
  target,
  size
) {

  target.innerHTML = "";


  new QRCode(
    target,
    {
      text: MENU_URL,

      width: size,

      height: size,

      colorDark:
        "#111111",

      colorLight:
        "#ffffff",

      correctLevel:
        QRCode.CorrectLevel.H
    }
  );

}


/* =========================
   WHATSAPP MESSAGE
========================= */

function createOrderMessage() {

  const name =
    $("#customerName")
      .value
      .trim();


  const mobile =
    $("#customerMobile")
      .value
      .trim();


  const table =
    $("#tableNo")
      .value
      .trim() ||
    "Not specified";


  const type =
    $("#orderType")
      .value;


  const note =
    $("#customerNote")
      .value
      .trim() ||
    "None";


  const payment =
    document.querySelector(
      'input[name="payment"]:checked'
    ).value;


  const total =
    totals();


  const orderId =
    "AS" +
    Date.now()
      .toString()
      .slice(-6);


  const itemLines =
    cart.map(row => {

      const item =
        menu.find(
          x => x.id === row.id
        );


      return (
        `• ${item.name} × ${row.qty} = ` +
        `${money(item.price * row.qty)}`
      );

    }).join("\n");


  const message = [

    "*AASHISH SANDWICH™ - NEW ORDER*",

    "",

    `*Order ID:* ${orderId}`,

    `*Name:* ${name}`,

    `*Mobile:* ${mobile}`,

    `*Table:* ${table}`,

    `*Order Type:* ${type}`,

    `*Payment:* ${payment}`,

    "",

    "*Items:*",

    itemLines,

    "",

    `*Subtotal:* ${money(total.subtotal)}`,

    `*Tax/Charges:* ${money(total.tax)}`,

    `*TOTAL:* ${money(total.total)}`,

    "",

    `*Note:* ${note}`,

    "",

    "Thank you! ❤️"

  ].join("\n");


  return message;

}


/* =========================
   GLOBAL CLICK HANDLER
========================= */

document.addEventListener(
  "click",
  event => {

    const add =
      event.target
        .closest("[data-add]");


    if (add) {

      addToCart(
        Number(
          add.dataset.add
        )
      );

    }


    const plus =
      event.target
        .closest("[data-plus]");


    if (plus) {

      changeQty(
        Number(
          plus.dataset.plus
        ),
        1
      );

    }


    const minus =
      event.target
        .closest("[data-minus]");


    if (minus) {

      changeQty(
        Number(
          minus.dataset.minus
        ),
        -1
      );

    }


    const remove =
      event.target
        .closest("[data-remove]");


    if (remove) {

      removeItem(
        Number(
          remove.dataset.remove
        )
      );

    }


    if (
      event.target
        .closest(".cart-open")
    ) {

      openCart();

    }


    if (
      event.target
        .closest("#closeCart") ||
      event.target
        .closest(".cart-close") ||
      event.target ===
        $("#overlay")
    ) {

      closeCart();

    }


    if (
      event.target
        .closest(".modal-close") ||
      event.target
        .closest(".qr-close")
    ) {

      closeModals();

    }

  }
);


/* =========================
   CATEGORY FILTER
========================= */

$$(".category")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        $$(".category")
          .forEach(
            item =>
              item.classList
                .remove("active")
          );


        button.classList
          .add("active");


        renderMenu();

      }
    );

  });


/* =========================
   SEARCH
========================= */

$("#searchInput")
  .addEventListener(
    "input",
    renderMenu
  );


$("#clearSearch")
  .addEventListener(
    "click",
    () => {

      $("#searchInput")
        .value = "";

      renderMenu();

    }
  );


/* =========================
   CHECKOUT
========================= */

$("#checkoutBtn")
  .addEventListener(
    "click",
    () => {

      if (!cart.length) {

        showToast(
          "Your cart is empty"
        );

        return;

      }


      closeCart();

      openModal(
        "#checkoutModal"
      );


      $("#checkoutTotal")
        .textContent =
          money(
            totals().total
          );

    }
  );


/* =========================
   PLACE ORDER
========================= */

$("#checkoutForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const mobile =
        $("#customerMobile")
          .value
          .trim();


      if (
        !/^\d{10}$/.test(
          mobile
        )
      ) {

        showToast(
          "Please enter a valid 10 digit mobile number"
        );

        return;

      }


      const message =
        createOrderMessage();


      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


      window.open(
        whatsappUrl,
        "_blank"
      );


      showToast(
        "Opening WhatsApp order..."
      );


      closeModals();


      cart = [];


      saveCart();


      renderCart();


      event.target.reset();

    }
  );


/* =========================
   DEMO PAYMENT
========================= */

$("#demoPayment")
  .addEventListener(
    "click",
    () => {

      showToast(
        "Demo payment successful — real gateway can be connected later."
      );

    }
  );


/* =========================
   OPEN QR
========================= */

$("#openQr")
  .addEventListener(
    "click",
    () => {

      openModal(
        "#qrModal"
      );


      generateQr(
        $("#qrLarge"),
        280
      );

    }
  );


/* =========================
   DOWNLOAD QR
========================= */

$("#downloadQr")
  .addEventListener(
    "click",
    () => {

      const canvas =
        $("#qrLarge canvas");

      const image =
        $("#qrLarge img");


      const source =
        canvas
          ? canvas.toDataURL(
              "image/png"
            )
          : image?.src;


      if (!source) return;


      const link =
        document.createElement(
          "a"
        );


      link.href =
        source;


      link.download =
        "Aashish-Sandwich-QR-Menu.png";


      link.click();

    }
  );


/* =========================
   INITIALIZE
========================= */

generateQr(
  $("#qrPreview"),
  145
);

renderMenu();

renderCart();
