// Define popover Variables
const popoverIcon = document.querySelector(".popover-icon");
const popoverBody = document.querySelector(".popover-body");
// Define Cart items
const cartBadge = document.querySelector(".cart-badge");
// Define user profile link & logging in
const userProfileLink = document.querySelector(".profile-link");
const userProfileSpan = document.querySelector(".profile-span");

// popover
popoverIcon.addEventListener("click", function (e) {
  popoverBody.classList.toggle("d-none");
});
// get products
window.addEventListener("load", function (e) {
  isLoggedIn();
});
// Define Function to create elements on fly containeing d=fetched url data
function editProductCard() {
  let product = JSON.parse(localStorage.getItem("product"));
  const productImageConatiner = document.querySelector(
    ".product-image-container"
  );
  const productImage = document.createElement("img");
  productImage.setAttribute("src", `${product.images[0]}`);
  productImageConatiner.append(productImage);
  const productCategory = document.querySelector(".product-category");
  productCategory.innerHTML += ` > ${product.category}`;
  productCategory.classList.add("text-muted");
  const productTitle = document.querySelector(".product-title");
  productTitle.innerHTML = `${product.title}`;
  const productDescription = document.querySelector(".product-description");
  productDescription.innerHTML = `${product.description}`;
  const productRating = document.querySelector(".product-rating");
  productRating.setAttribute("data-value", `${parseInt(product.rating)}`);
  productRating.setAttribute("disabled", "");
  const priceAfterDiscount = document.querySelector(
    ".product-price-after-discount"
  );
  priceAfterDiscount.innerHTML = `EGP ${(
    product.price *
    ((100 - product.discountPercentage) / 100)
  ).toFixed(2)}`;
  const priceBeforeDiscount = document.querySelector(
    ".product-price-before-discount"
  );
  priceBeforeDiscount.innerHTML = `<del class="fs-6">EGP ${product.price.toFixed(
    2
  )}</del> <span class="discount-style ms-1">${
    product.discountPercentage
  }%</span>`;
  const addCartBtn = document.querySelector(".add-cart-btn");
  const cartBlock = document.createElement("div");
  cartBlock.classList.add(
    "d-none",
    "w-100",
    "m-0",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "cart-block"
  );
  cartBlock.innerHTML = `
    <a class=" btn btn-success w-25 fw-bold fs-5 border-none minus" style="background-color:#f49301;">-</a>
    <span class="w-50 text-success fs-5 text-dark text-center text-counter">0</span>
    <a class="btn btn-success w-25 fw-bold fs-5 border-none plus" style="background-color:#f49301;">+</a>
   `;
  addCartBtn.after(cartBlock);
  document.styleSheets[2].insertRule(
    ".card:hover {transform:scale(1.01);box-shadow:0px 0px 5px gray;z-index:10;border-radius:none;}"
  );
  createProductCardEvents(product, addCartBtn, cartBlock);
}
editProductCard();
// Event handlers on created elements on the fly
function createProductCardEvents(product, addCartBtn, cartBlock) {
  addCartBtn.addEventListener("click", function (e) {
    cartBlock.classList.remove("d-none");
    addCartBtn.classList.add("d-none");
  });
  cartBlock.addEventListener("click", function (e) {
    if (e.target.classList.contains("plus")) {
      if (userProfileSpan.innerHTML === "Login/Resgister") {
        const plusBtn = document.querySelector(".plus");
        plusBtn.setAttribute("href", "../Loginpage/form.html");
      } else {
        for (const child of cartBlock.children) {
          if (child.classList.contains("text-counter")) {
            child.innerHTML++;
            child.innerHTML >= 5
              ? e.target.classList.add("disabled")
              : e.target.classList.remove("disabled");
            setItemsToUserCartToLocalStorage(product);
          }
        }
      }
    }
    if (e.target.classList.contains("minus")) {
      if (userProfileSpan.innerHTML === "Login/Resgister") {
        const minusBtn = document.querySelector(".minus");
        minusBtn.setAttribute("href", "../Loginpage/form.html");
      } else {
        for (const child of cartBlock.children) {
          if (child.classList.contains("text-counter")) {
            child.innerHTML--;
            child.innerHTML <= 0 ? (child.innerHTML = 0) : true;
            deleteItemsFromUserCartFromLocalStorage(product);
          }
        }
      }
    }
  });
}
// Function to check whether user is logged in or not
function isLoggedIn() {
  userProfileSpan.innerHTML = "Login/Resgister";
  userProfileLink.setAttribute("href", "../Loginpage/form.html");
  JSON.parse(localStorage.getItem("user")).forEach((user) => {
    let email = user.email;
    if (user.isloggedin) {
      userProfileSpan.innerHTML = "Hi," + " " + user.firstname;
      userProfileLink.setAttribute("href", "../Profile/index.html");
      JSON.parse(localStorage.getItem("cart")).forEach((data) => {
        if (data.email === email) {
          cartBadge.innerHTML = data.products.length;
        }
      });
    }
  });
}
// Function to insert items to user cart in local storage
function setItemsToUserCartToLocalStorage(product) {
  JSON.parse(localStorage.getItem("user")).forEach((user) => {
    let email = user.email;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let exist =
      cart.length != 0 &&
      JSON.parse(localStorage.getItem("cart")).some(
        (data) => data.email === email
      );
    if (user.isloggedin) {
      if (!exist) {
        let products = [];
        products.push(product);
        cart.push({ email, products });
        localStorage.setItem("cart", JSON.stringify(cart));
        cartBadge.innerHTML = 1;
      } else {
        cart.forEach((data) => {
          if (data.email === email) {
            data.products.push(product);
            cartBadge.innerHTML = data.products.length;
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        });
      }
    }
  });
}
// Function to delete items from user cart in local storage
function deleteItemsFromUserCartFromLocalStorage(product) {
  JSON.parse(localStorage.getItem("user")).forEach((user) => {
    let email = user.email;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (user.isloggedin) {
      cart.forEach((data) => {
        if (data.email === email) {
          let indexOfItemsInCart = data.products.findIndex(
            (e) => e.id === product.id
          );
          if (indexOfItemsInCart !== -1) {
            data.products.splice(indexOfItemsInCart, 1);
          }
          cartBadge.innerHTML = data.products.length;
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      });
    }
  });
}
