// Header Popover Function
const popoverIcon = document.querySelector(".popover-icon");
const popoverBody = document.querySelector(".popover-body");

popoverIcon.addEventListener("click", function (e) {
  popoverBody.classList.toggle("d-none");
});

// Product-card-data
const cardParent = document.querySelector(".append-cards");
// fetch - function

async function getData(url) {
  try {
    const data = await fetch(url);
    const res = await data.json();
    console.log(res);
    for (let i = 0; i < 8; i++) {
      for (const product of res.products) {
        const grid = document.createElement("div");
        grid.classList.add(
          "col-12",
          "col-sm-6",
          "col-md-4",
          "col-lg-3",
          "m-0",
          "p-0"
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
        cardText.innerHTML = `EGP ${(product.price * ((100 - product.discountPercentage)/100)).toFixed(2)}`;
        cardBody.appendChild(cardText);
        const priceBerforeDiscount = document.createElement("p");
        priceBerforeDiscount.classList.add("card-text", "fw-lighter","text-light");
        priceBerforeDiscount.innerHTML = `<del>EGP ${product.price}.00</del>`;
        cardBody.appendChild( priceBerforeDiscount);
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
        document.styleSheets[3].insertRule(".card:hover {transform:scale(1.05);box-shadow:0px 0px 3px gray;z-index:10}");
      }
    }
  } catch (e) {
    console.log(e);
  }
}

getData("https://dummyjson.com/products/category/groceries");

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
