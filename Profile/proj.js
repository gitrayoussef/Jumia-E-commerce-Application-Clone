// declare variables to get data from local storage
function displayData(){
    if(localStorage.getItem("user")){
        var email = document.querySelector("#email");
        var firstname = document.querySelector("#fName");
        var lastname = document.querySelector("#lName");
        var lfname = document.querySelector("#leftFName");
        var llname = document.querySelector("#leftLName");

    JSON.parse(localStorage.getItem("user")).forEach(data => {
        if(data.isloggedin === true){
            email.innerHTML = `${data.email}`;
            lfname.innerHTML = `${data.firstname}`;
            llname.innerHTML = `${data.lastname}`;
            firstname.innerHTML = `${data.firstname}`;
            lastname.innerHTML = `${data.lastname}`;
        }
    
    })
    
    }
    
}

displayData();






// Define popover Variables
const popoverIcon = document.querySelector(".popover-icon");
const popoverBody = document.querySelector(".popover-body");
// popover
popoverIcon.addEventListener("click", function (e) {
    popoverBody.classList.toggle("d-none");
});

// user logout
let logout = document.getElementById("logout").addEventListener("click",function(){
    JSON.parse(localStorage.getItem("user")).forEach(d => {
        const user = [];
        if(d.isloggedin === true){
            d.isloggedin = false;
        }
        user.push(d);
        localStorage.setItem("user" , JSON.stringify(user));

    })
    
    // setTimeout(() => {
    //     window.location = "../Homepage/index.html"
    // }, 1500);
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

console.log(window.localStorage.getItem("user"));







