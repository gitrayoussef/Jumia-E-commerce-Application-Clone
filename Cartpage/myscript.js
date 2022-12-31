//declerations
const productContainer = document.querySelector(".ibox-contents");
const productNumbers = document.querySelector(".pull-right strong");
const totalprice = document.querySelector(".ibox-content h2");
totalprice.innerHTML = 0;
const checkoutBtn = document.querySelector(".checkout-btn");
// alert user
const alertMessage = document.querySelector(".alert-message");
const alertUser = document.querySelector(".alert-user");
let itemPriceArray = [];

//display the item number
let productnumber = localStorage.getItem("productsnumber");
if (productnumber != null) productNumbers.innerHTML = `${productnumber}`;
else productNumbers.innerHTML = 0;
// display the card
function displayCard() {
  let cartItems = localStorage.getItem("cart");
  cartItems = JSON.parse(cartItems);
  //console.log( cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    cartItems.forEach((item) => {
      item.products.forEach((item2) => {
        productContainer.innerHTML += `
            <div class="ibox-content">
            <div class="table-responsive">
                <table class="table shoping-cart-table">
                    <tbody>
                    <tr>
                        <td width="90">
                          <img src="${
                            item2.thumbnail
                          }" style="height:100px;width:100px">
                        </td>
                        <td class="desc">
                            <h3>
                                <a href="#" class="text-navy">
                                   ${item2.title}
                                </a>
                            </h3>
                            <p class="small">
                                ${item2.description}
                            </p>
                            <dl class="small m-b-none">
                                <dt>Category</dt>
                                <dd>${item2.category}</dd>
                            </dl>
                            <dl class="small m-b-none">
                            <dt>Brand Name</dt>
                            <dd>${item2.brand}</dd>
                        </dl>                          
                        </td>
                        <td>
                            <del class="text-muted">$${item2.price}</del>
                        </td>
                        <td width="65">
                            <input type="number" class="form-control product-number-input" placeholder="1" value="1"  min="0" max="5">
                        </td>
                        <td>
                        <span><h4 class="product-number-price">
                                ${parseInt(
                                  parseInt(item2.price) -
                                    parseInt(item2.price) *
                                      parseFloat(1 / item2.discountPercentage)
                                )}$</span>
                            </h4> 
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
            `;
        itemPriceArray.push(
          parseInt(
            parseInt(item2.price) -
              parseInt(item2.price) * parseFloat(1 / item2.discountPercentage)
          )
        );
        //display the total
        totalprice.innerHTML = `${
          parseInt(totalprice.innerHTML) +
          parseInt(
            parseInt(item2.price) -
              parseInt(item2.price) * parseFloat(1 / item2.discountPercentage)
          )
        }`;
        productNumbers.innerHTML++;
      });
    });
  }
}
window.addEventListener("load", function (e) {
  displayCard();
  eventsOnCard();
});
let totalPriceList;

function eventsOnCard() {
  let productNumberInput = document.querySelectorAll(".product-number-input");
  let productNumberPrice = document.querySelectorAll(".product-number-price");
  for (let i = 0; i < productNumberInput.length; i++) {
    productNumberInput[i].addEventListener("click", function (e) {
      for (let j = 0; j < productNumberPrice.length; j++) {
        if (i === j) {
          productNumberPrice[i].innerHTML = `${
            itemPriceArray[j] *
            productNumberInput[i].value
          }`;
        }
        
        
      }
      let sum =0;
      totalPriceList = document.querySelectorAll('.product-number-price');
      for (let i = 0; i < totalPriceList.length; i++) {
        sum+= parseInt(totalPriceList[i].textContent);
       }
        totalprice.textContent=sum;
    });
  }
}

checkoutBtn.addEventListener("click", function (e) {
  console.log("x");
  deleteItems();
  alert(alertUser.classList.add("d-none"));
});

// Function to delete items from user cart in local storage
function deleteItems() {
  JSON.parse(localStorage.getItem("user")).forEach((user) => {
    let email = user.email;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (user.isloggedin) {
      cart.forEach((data) => {
        if (data.email === email) {
          data.products = [];
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      });
    }
  });
}

// Define popover Variables
const popoverIcon = document.querySelector(".popover-icon");
const popoverBody = document.querySelector(".popover-body");
// Define Cart items
const cartBadge = document.querySelector(".cart-badge");
// Define user profile link & logging in
const userProfileLink = document.querySelector(".profile-link");
const userProfileSpan = document.querySelector(".profile-span");

// get products
window.addEventListener("load", function (e) {
  isLoggedIn();
});
// popover
popoverIcon.addEventListener("click", function (e) {
  popoverBody.classList.toggle("d-none");
});
// Function to check whether user is logged in or not
function isLoggedIn() {
  userProfileSpan.innerHTML = "Login/Resgister";
  userProfileLink.setAttribute("href", "../../../Loginpage/form.html");
  JSON.parse(localStorage.getItem("user")).forEach((user) => {
    let email = user.email;
    if (user.isloggedin) {
      userProfileSpan.innerHTML = "Hi," + " " + user.firstname;
      userProfileLink.setAttribute("href", "../../../Profile/index.html");
      JSON.parse(localStorage.getItem("cart")).forEach((data) => {
        if (data.email === email) {
          cartBadge.innerHTML = data.products.length;
        }
      });
    }
  });
}
