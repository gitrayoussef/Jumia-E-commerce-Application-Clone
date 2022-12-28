// Define popover Variables
const popoverIcon = document.querySelector(".popover-icon");
const popoverBody = document.querySelector(".popover-body");
// Define fetch all data varaible
const cardParent = document.querySelector(".append-cards");
// Define get data by price varaible
const priceSlider = document.querySelector(".price-slider");
const applyBtn = document.querySelector(".apply-btn");
const requiredMinPrice = document.querySelector(".form-range-min-number");
const requiredMaxPrice = document.querySelector(".form-range-max-number");
const sliderRequiredMinPrice = document.querySelector("#min-value-price");
const sliderRequiredMaxPrice = document.querySelector("#max-value-price");
// Define get data by rating
const chooseRating = document.querySelector(".rating");
const ratingStars = document.querySelector("input[data-role='rating']");
// Define highlight search text
const search = document.querySelector(".search-products");
const searchBtn = document.querySelector(".search-products-btn");
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
  getData("https://dummyjson.com/products/category/groceries");
  isLoggedIn();
});
// get product by rating
chooseRating.addEventListener("click", async function (e) {
  cardParent.replaceChildren();
  const res = await getUrlData(
    "https://dummyjson.com/products/category/groceries"
  );
  choseCertainRating(res);
});
// get product by price
sliderRequiredMinPrice.addEventListener("change", function (e) {
  requiredMinPrice.value = sliderRequiredMinPrice.value;
});
sliderRequiredMaxPrice.addEventListener("change", function (e) {
  requiredMaxPrice.value = sliderRequiredMaxPrice.value;
});
requiredMinPrice.addEventListener("change", function (e) {
  sliderRequiredMinPrice.value = requiredMinPrice.value;
  sliderRequiredMinPrice.setAttribute(
    "data-value",
    sliderRequiredMinPrice.value
  );
});
requiredMaxPrice.addEventListener("change", function (e) {
  sliderRequiredMaxPrice.value = requiredMaxPrice.value;
  sliderRequiredMaxPrice.setAttribute(
    "data-value",
    sliderRequiredMaxPrice.value
  );
});
applyBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  cardParent.replaceChildren();
  const res = await getUrlData(
    "https://dummyjson.com/products/category/groceries"
  );
  choseCertainPriceRange(res);
});
// Highlight search text
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const res = await getUrlData(
    "https://dummyjson.com/products/category/groceries"
  );
  highlightSearchText(res);
});

// Define Function to fetch a certain url data
async function getUrlData(url) {
  try {
    const data = await fetch(url);
    const res = await data.json();
    return res;
  } catch (e) {
    console.log(e);
  }
}
// Define Function to create elements on fly containeing d=fetched url data
function createProductCard(product) {
  const grid = document.createElement("div");
  grid.classList.add(
    "col-12",
    "col-sm-6",
    "col-md-4",
    "col-lg-3",
    "m-0",
    "p-0",
    "select-p"
  );
  cardParent.appendChild(grid);
  const card = document.createElement("div");
  card.classList.add("card", "m-0");
  card.style.width = "100%";
  grid.appendChild(card);
  const cardImg = document.createElement("img");
  cardImg.classList.add("card-img-top");
  cardImg.setAttribute("src", product.thumbnail);
  cardImg.style.height = "250px";
  card.appendChild(cardImg);
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.style.height = "50%";
  cardImg.after(cardBody);
  const cardTitle = document.createElement("p");
  cardTitle.classList.add("card-title", "text-truncate", "fw-bold");
  cardTitle.innerHTML = product.title;
  cardBody.appendChild(cardTitle);
  const cardDescription = document.createElement("p");
  cardDescription.classList.add("card-title", "line-truncate");
  cardDescription.innerHTML = product.description;
  cardBody.appendChild(cardDescription);
  const cardText = document.createElement("p");
  cardText.classList.add("card-text", "fw-semibold");
  cardText.innerHTML = `EGP ${(
    product.price *
    ((100 - product.discountPercentage) / 100)
  ).toFixed(2)}`;
  cardBody.appendChild(cardText);
  const priceBerforeDiscount = document.createElement("p");
  priceBerforeDiscount.classList.add("card-text", "fw-lighter", "text-light");
  priceBerforeDiscount.innerHTML = `<del>EGP ${product.price}.00</del>`;
  cardBody.appendChild(priceBerforeDiscount);
  const productRating = document.createElement("input");
  productRating.setAttribute("data-role", "rating");
  productRating.setAttribute("data-star-color", "yellow");
  productRating.setAttribute("data-stared-color", "yellow");
  productRating.setAttribute("data-value", parseInt(product.rating));
  productRating.setAttribute("disabled", "");
  productRating.classList.add("pb-2");
  cardBody.appendChild(productRating);
  const button = document.createElement("button");
  button.textContent = "ADD TO CART";
  button.classList.add("btn", "add-cart-btn");
  productRating.after(button);
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
  <button class=" btn btn-success w-25 fw-bold fs-5 border-none minus" style="background-color:#f49301;">-</button>
  <span class="w-50 text-success fs-5 text-dark text-center text-counter">0</span>
  <button class="btn btn-success w-25 fw-bold fs-5 border-none plus" style="background-color:#f49301;">+</button>
 `;
  productRating.after(cartBlock);
  document.styleSheets[2].insertRule(
    ".card:hover {transform:scale(1.01);box-shadow:0px 0px 5px gray;z-index:10;border-radius:none;}"
  );
  createProductCardEvents(cartBlock, button, product);
}
// Event handlers on created elements on the fly
function createProductCardEvents(cartBlock, button, product) {
  button.addEventListener("click", function (e) {
    cartBlock.classList.remove("d-none");
    button.classList.add("d-none");
  });
  cartBlock.addEventListener("click", function (e) {
    if (e.target.classList.contains("plus")) {
      for (const child of cartBlock.children) {
        if (child.classList.contains("text-counter")) {
          child.innerHTML++;
          child.innerHTML >= 5
            ? e.target.classList.add("disabled")
            : e.target.classList.remove("disabled");
          setItemsToUserCartToLocalStorage(product);
        }
      }
    } else if (e.target.classList.contains("minus")) {
      for (const child of cartBlock.children) {
        if (child.classList.contains("text-counter")) {
          child.innerHTML--;
          child.innerHTML <= 0 ? (child.innerHTML = 0) : true;
          deleteItemsFromUserCartFromLocalStorage(product);
        }
      }
    }
  });
}
// Define Function to get the data of the url & create element
async function getData(url) {
  try {
    const res = await getUrlData(url);
    for (const product of res.products) {
      createProductCard(product);
    }
  } catch (e) {
    console.log(e);
  }
}
// Define Function to fetch products according to certain price
function choseCertainPriceRange(res) {
  for (const product of res.products) {
    const priceBeforeDiscount = product.price;
    const priceAfterDiscount =
      product.price * ((100 - product.discountPercentage) / 100);
    if (
      (parseInt(priceAfterDiscount) || parseInt(priceBeforeDiscount)) >=
        requiredMinPrice.value &&
      (parseInt(priceAfterDiscount) || parseInt(priceBeforeDiscount)) <=
        requiredMaxPrice.value
    ) {
      createProductCard(product);
    }
  }
}
// Define Function to fetch products according to certain rating
function choseCertainRating(res) {
  for (const product of res.products) {
    if (parseInt(product.rating) == ratingStars.value) {
      createProductCard(product);
    }
  }
}
// Define Function to search text on page
function highlightSearchText(res) {
  const searchText = search.value.toLowerCase();
  if (searchText) {
    for (const product of res.products) {
      if (
        product.description.toLowerCase().match(`${searchText}`) ||
        product.title.toLowerCase().match(`${searchText}`)
      ) {
        cardParent.replaceChildren();
        createProductCard(product);
        const regex = new RegExp(searchText, "gim");
        let text = cardParent.innerHTML;
        text = text.replace(
          /(<mark class="highlight" style="background-color: yellow;">|<\/mark>)/gim,
          ""
        );
        const newText = text.replace(
          regex,
          `<mark class="highlight" style="background-color: yellow;">${searchText}</mark>`
        );
        cardParent.innerHTML = newText;
      }
    }
  }
}
// Function to check whether user is logged in or not
function isLoggedIn() {
  userProfileSpan.innerHTML = "Login/Resgister";
  userProfileLink.setAttribute("href", "../Loginpage/form.html");
  JSON.parse(localStorage.getItem("user")).forEach((user) => {
    if (user.isloggedin) {
      userProfileSpan.innerHTML = user.firstname + " " + user.lastname;
      userProfileLink.setAttribute("href", "../Profile/index.html");
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
        let productsId = [];
        productsId.push(product.id);
        cart.push({ email, productsId });
        localStorage.setItem("cart", JSON.stringify(cart));
        cartBadge.innerHTML = cart[0].productsId.length;
      } else {
        cart.forEach((data) => {
          if (data.email === email) {
            data.productsId.push(product.id);
            cartBadge.innerHTML = data.productsId.length;
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
          let indexOfItemsInCart = data.productsId.findIndex(
            (e) => e === product.id
          );
          console.log(indexOfItemsInCart);
          if (indexOfItemsInCart !== -1) {
            data.productsId.splice(indexOfItemsInCart, 1);
          }
          cartBadge.innerHTML = data.productsId.length;
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      });
    }
  });
}
