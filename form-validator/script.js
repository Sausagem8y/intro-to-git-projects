const form = document.getElementById("form");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

let isValid = false;
let passwordsMatch = false;

function validateForm() {
  // using Constraint API
  isValid = form.checkValidity();
  // style main error message
  if (!isValid) {
    message.textContent = "please fill out all fields";
    message.style.color = "orange";
    messageContainer.style.borderColor = "red";
    return;
  }
  if (password1El.value === password2El.value) {
    passwordsMatch = true;
    password1El.style.borderColor = "green";
    password2El.style.borderColor = "green";
  } else {
    passwordsMatch = false;
    message.textContent = "make sure passwords match";
    message.style.color = "orange";
    messageContainer.style.borderColor = "red";
    password1El.style.borderColor = "red";
    password2El.style.borderColor = "red";
    return;
  }
  // if form is valid and passwords match
  if (isValid && passwordsMatch) {
    message.textContent = "Succesfully Registered!";
    message.style.color = "green";
    messageContainer.style.borderColor = "green";
  }
}

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value,
  };
  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  //   validate form
  validateForm();
  // only submit if valid
  if (isValid && passwordsMatch) {
    storeFormData();
  }
}
// event listener
form.addEventListener("submit", processFormData);
