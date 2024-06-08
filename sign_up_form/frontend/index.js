const userName  = document.getElementById("name");
const email  = document.getElementById("email");
const password  = document.getElementById("password");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

const submitBtn = document.getElementById("submit-btn");


submitBtn.addEventListener("click", (e) => {
    // username validation
    if (userName.value === "" || null) {
        e.preventDefault();
        nameError.textContent = "Enter Your Name **"

    } else {
        nameError.textContent = "";
    }
    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.match(emailRegex) ) {
        e.preventDefault();
        emailError.textContent =  "Invalid email address **"

    } else{
        emailError.textContent = " ";
    }

    // password validation
    if (password.value === "") { 
        e.preventDefault();

        passwordError.textContent = " Password cannot be empty **";

    }
     else if (password.value.length <=5) { 
        e.preventDefault();
        passwordError.textContent = "password must be more than 5 characters **";
    } 

    else if(password.value.length >=20) { 
        e.preventDefault();
        passwordError.textContent = "password must  not be more than 20 characters **";
    } 
    else if (password.value === "password"){
        e.preventDefault();
        passwordError.textContent = "Password cannnot be Password **"
    }

    else {
        passwordError.textContent = "";
    }
   
});
