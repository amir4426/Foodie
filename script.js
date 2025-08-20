// var swiper = new Swiper(".mySwiper", {
//   navigation: {
//     nextEl: "#next",
//     prevEl: "#prev",
//   },
// });

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");
const totalCart = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

if (cartIcon && cartTab) {
  cartIcon.addEventListener("click", () => {
    console.log("cart icon clicked");
    cartTab.classList.add("cart-tab-active");
  });
} else {
  console.error("cartIcon or cartTab not found in DOM");
}

closeBtn.addEventListener("click", () => {
  cartTab.classList.remove("cart-tab-active");
});

// for Hamburger on mobile menu
hamburger.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("click on hamburger");
  mobileMenu.classList.toggle("mobile-menu-active");
});

let productList = [];
let cartProduct = [];

const updateTotals = () => {
  let total = 0;
  let totalQuantity = 0;

  document.querySelectorAll(".item").forEach((item) => {
    let quantity = parseInt(item.querySelector(".quantity-value").textContent);

    let price = parseFloat(
      item.querySelector(".item-total").textContent.replace("$", "")
    );
    total += price;
    totalQuantity += quantity;
  });
  totalCart.textContent = `$${total.toFixed(2)}`;
  cartValue.textContent = totalQuantity;
};

const showCard = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");
    orderCard.innerHTML = `
      <div class="card-image">
      <img src="${product.image}">
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">$${product.price}</h4>
      <a href="#" class="btn add-to-cart">Add to Cart</a>
      `;
    cardList.appendChild(orderCard);
    const cartBtn = orderCard.querySelector(".add-to-cart");
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};

const addToCart = (product) => {
  const existingProduct = cartProduct.find((item) => item.id === product.id);
  if (existingProduct) {
    alert("Product already added to cart");
    return;
  }

  cartProduct.push(product);

  let price = parseFloat(product.price.toString().replace("$", ""));

  let quantity = 1;

  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  cartItem.innerHTML = `
    <div class="image-container">
    <img src="${product.image}">
    </div>
    <div class="detail">
    <h4>${product.name}</h4>
    <h4 class="item-total">$${product.price}</h4>
    </div>
    <div class="flex">
    <a href="#" class="quantity-btn"><i class="fa-solid fa-minus minus"></i></a>
    <h4 class="quantity-value">1</h4>
    <a href="#" class="quantity-btn"><i class="fa-solid fa-plus plus"></i></a>
    </div>
  `;
  cartList.appendChild(cartItem);
  updateTotals();

  const itemTotal = cartItem.querySelector(".item-total");
  const plusBtn = cartItem.querySelector(".plus");

  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    cartItem.querySelector(".quantity-value").textContent = quantity;
    itemTotal.textContent = `$${(quantity * price).toFixed(2)}`;
    updateTotals();
  });

  const minusBtn = cartItem.querySelector(".minus");
  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      cartItem.querySelector(".quantity-value").textContent = quantity;
      itemTotal.textContent = `$${(quantity * price).toFixed(2)}`;
      updateTotals();
    } else {
      cartItem.remove();
      cartProduct = cartProduct.filter((item) => item.id !== product.id);
      updateTotals();
    }
  });
};
const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCard();
    })
    .catch((err) => console.log(err));
};

initApp();
