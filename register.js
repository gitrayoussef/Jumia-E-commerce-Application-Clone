

const activeReg = () => {
  if ( firstname.classList.contains("success") &&lastname.classList.contains("success") && email.classList.contains("success") && psw.classList.contains("success") && pswrepeat.classList.contains("success")) {
      regbtn.removeAttribute("disabled")
  } else {
      regbtn.setAttribute("disabled", "disabled")
  }
}



// local storage

const signUp = e => {

  
  let formData = JSON.parse(localStorage.getItem('formData')) || [];
  formData.push({
    firstname : document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    email : document.getElementById('email').value,
    psw : document.getElementById('psw').value
      })
      localStorage.setItem('formData', JSON.stringify(formData));
      document.querySelector("form").reset();
      e.preventDefault();
      
    }


// 15 letters from 2 to 15
const regname = /^[a-zA-Z]{3,15}$/;

firstname.addEventListener("keyup", (eo) => {
  firstname.classList.add("error")
  usermessage.style.display = "block"


  if(regname.test(firstname.value)) {
      firstname.classList.add("success")
      usermessage.style.display = "none"
      firstname.nextElementSibling.style.opacity = "1"
  } else {
      firstname.classList.remove("success")
      usermessage.style.display = "block"
      firstname.nextElementSibling.style.opacity = "0"
  }

  
})

// 15 letters from 2 to 15
// capital or small

lastname.addEventListener("keyup", (eo) => {
  lastname.classList.add("error")
  lastmessage.style.display = "block"


  if (regname.test(lastname.value))  {
      lastname.classList.add("success")
      lastmessage.style.display = "none"
      lastname.nextElementSibling.style.opacity = "1"
  } else {
      lastname.classList.remove("success")
      lastmessage.style.display = "block"
      lastname.nextElementSibling.style.opacity = "0"
  }

 
})


// ali@gmail.com



email.addEventListener("keyup", (eo) => {
  email.classList.add("error")
  emailmessage.style.display = "block"
  const regEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  if (regEmail.test(email.value)) {
      email.classList.add("success")
      emailmessage.style.display = "none"
      email.nextElementSibling.style.opacity = "1"
  } else {
      email.classList.remove("success")
      emailmessage.style.display = "block"
      email.nextElementSibling.style.opacity = "0"
  }


})


  // passward = marwan1A  and not more than 15 ,and not lessthan 8 , no special charcter.

psw.addEventListener("keyup", (eo) => {
  psw.classList.add("error")
  pswmessage.style.display = "block"
  const regPassword =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

  

  if (regPassword.test(psw.value)) {
      psw.classList.add("success")
      pswmessage.style.display = "none"
      psw.nextElementSibling.style.opacity = "1"
  } else {
      psw.classList.remove("success")
      pswmessage.style.display = "block"
      psw.nextElementSibling.style.opacity = "0"
  }

  
})


//  repeat passward must match

pswrepeat.addEventListener("keyup", (eo) => {
  pswrepeat.classList.add("error")
  repeatmessage.style.display = "block"

  if (pswrepeat.value    ===  psw.value ) {
      pswrepeat.classList.add("success")
      repeatmessage.style.display = "none"
      pswrepeat.nextElementSibling.style.opacity = "1"
  } else {
      pswrepeat.classList.remove("success")
      repeatmessage.style.display = "block"
      pswrepeat.nextElementSibling.style.opacity = "0"
  }

  activeReg()






  
})





















