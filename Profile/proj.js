
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
