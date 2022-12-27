// declare variables to get data from local storage

// document.getElementById("left_name").innerHTML = localStorage.getItem("");
// document.getElementById("email").innerHTML = localStorage.getItem("");
// document.getElementById("leftFName").innerHTML = localStorage.getItem("");
// document.getElementById("leftLName").innerHTML = localStorage.getItem("");
// document.getElementById("fName").innerHTML = localStorage.getItem("");
// document.getElementById("lName").innerHTML = localStorage.getItem("");


// user logout
let logout = document.getElementById("logout").addEventListener("click",function(){
    location.href = "../Javascript-Project-zyadShalaby/form.html";
});


//clear user account
// let closeAccount = document.getElementById("closeAccount").addEventListener("click",function(){
//     localStorage.removeItem("");
// });

let active = document.querySelectorAll("a");

//hover on aside menu
active.forEach((a) => {
    a.addEventListener("click",(e)=> {
        active.forEach((a)=>{
            a.classList.remove("active")
        });
        a.classList.add("active");
    });
});




