// Define popover Variables
const popoverIcon = document.querySelector(".popover-icon");
const popoverBody = document.querySelector(".popover-body");
// Define Cart items
const cartBadge = document.querySelector(".cart-badge");
// Define user profile link & logging in
const userProfileLink = document.querySelector(".profile-link");
const userProfileSpan = document.querySelector(".profile-span");
// Define user email & full name
const email = document.querySelector("#email");
const fullName = document.querySelector("#leftFName");
const fName = document.querySelector("#fName");
const lName = document.querySelector("#lName");
// define logout & delete account events
const logout = document.querySelector("#logout");
const closeAccount = document.querySelector("#closeAccount");
const updatedLocalStorage = [];

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
// get local storage data
JSON.parse(localStorage.getItem("user")).forEach((user) => {
  if (user.isloggedin) {
    email.innerHTML = user.email;
    fName.innerHTML = user.firstname;
    lName.innerHTML = user.lastname;
    fullName.innerHTML = user.firstname + " " + user.lastname;
  }
});
// adding logout click event
logout.addEventListener("click", function (e) {
  JSON.parse(localStorage.getItem("user")).forEach((user) => {
    if (user.isloggedin) {
      user.isloggedin = false;
    }
    updatedLocalStorage.push(user);
  });
  localStorage.setItem("user", JSON.stringify(updatedLocalStorage));
  logout.setAttribute("href", "../../../index.html");
});
// adding close account click event
closeAccount.addEventListener("click", function (e) {
  JSON.parse(localStorage.getItem("user")).forEach((user) => {
    updatedLocalStorage.push(user);
    if (user.isloggedin) {
      updatedLocalStorage.splice(user,1);
    }
  });
  localStorage.setItem("user", JSON.stringify(updatedLocalStorage));
  closeAccount.setAttribute("href", "../../../index.html");
});
