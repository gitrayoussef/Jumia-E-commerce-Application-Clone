//get the data from the local storage
const updatedLocalStorage = [];
function signIn() {
  let email = document.getElementById("email").value,
    psw = document.getElementById("psw").value;
  let user = JSON.parse(localStorage.getItem("user")) || [];

  //check if data exists in local storage
  let exist =
    user.length &&
    JSON.parse(localStorage.getItem("user")).some(
      (data) => data.email == email && data.psw == psw
    );
  if (!exist) {
    alert("Incorrect login credentials");
  } else {
    //between the quotation mark insert whatever the home page is called
    JSON.parse(localStorage.getItem("user")).forEach((element) => {
      if (element.email == email && element.psw == psw) {
        element.isloggedin = true;
        updatedLocalStorage.push(element);
      } else {
        element.isloggedin = false;
        updatedLocalStorage.push(element);
      }
    });
    // location.href = "../Homepage/index.html";
  }
  JSON.parse(
    localStorage.setItem("user", JSON.stringify(updatedLocalStorage))
  );
}
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  signIn();
});
