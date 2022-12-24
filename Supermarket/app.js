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

// popover
popoverIcon.addEventListener("click", function (e) {
  popoverBody.classList.toggle("d-none");
});
// get products
window.addEventListener("load", function (e) {
  getData("https://dummyjson.com/products/category/groceries");
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
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  highlightSearchText();
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
  grid.style.height = "28rem";
  cardParent.appendChild(grid);
  const card = document.createElement("div");
  card.classList.add("card", "m-0");
  card.style.width = "100%";
  card.style.height = "100%";
  grid.appendChild(card);
  const cardImg = document.createElement("img");
  cardImg.classList.add("card-img-top");
  cardImg.setAttribute("src", product.thumbnail);
  cardImg.style.height = "50%";
  card.appendChild(cardImg);
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.style.height = "50%";
  cardImg.after(cardBody);
  const cardTitle = document.createElement("p");
  cardTitle.classList.add("card-title", "text-truncate");
  cardTitle.innerHTML = product.description;
  cardBody.appendChild(cardTitle);
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
  button.classList.add("btn", "Add-cart-btn");
  productRating.after(button);
  document.styleSheets[2].insertRule(
    ".card:hover {transform:scale(1.01);box-shadow:0px 0px 5px gray;z-index:10;border-radius:none;}"
  );
}
// Define Function to get the data of the url & create element
async function getData(url) {
  try {
    const res = await getUrlData(url);
    for (let i = 0; i < 8; i++) {
      for (const product of res.products) {
        createProductCard(product);
      }
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
    console.log(parseInt(product.rating));
    console.log(ratingStars.value);
    if (parseInt(product.rating) == ratingStars.value) {
      createProductCard(product);
    }
  }
}

// Define Function to search text on page
function highlightSearchText() {
  const searchText = search.value.toLowerCase();
  if (searchText) {
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

// <div class="card m-0" style="width: 100%;">
//                 <img src="..." class="card-img-top" alt="...">
//                 <div class="card-body">
//                   <h5 class="card-title">Card title</h5>
//                   <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
//                     card's content.</p>
//                 </div>
//                 <ul class="list-group list-group-flush">
//                   <li class="list-group-item">An item</li>
//                   <li class="list-group-item">A second item</li>
//                   <li class="list-group-item">A third item</li>
//                 </ul>
//                 <div class="card-body">
//                   <a href="#" class="card-link">Card link</a>
//                   <a href="#" class="card-link">Another link</a>
//                 </div>
//               </div>

//               <input data-role="rating" data-value="0" data-star-color="yellow" data-stared-color="yellow">
