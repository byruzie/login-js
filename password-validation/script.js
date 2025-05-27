function submit(event) {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const confirmPasswordEl = document.getElementById("confirm-password");
  const formEl = document.getElementById("form-div");

  const password = passwordEl.value;
  const confirmPassword = confirmPasswordEl.value;

  let alertPassword = document.getElementById("p-alert");

  function createAlert() { 
    const alert = document.createElement("p");
    alert.textContent = "Passwords don't match";
    alert.id = "p-alert";
    alert.classList.add("p-alert");

    return alert;
  }

  function removeAlert() {
    if(alertPassword){
        formEl.removeChild(alertPassword);
        alertPassword = null; // reset alertPassword value
    }
    passwordEl.classList.remove("border-red");
    confirmPasswordEl.classList.remove("border-red");
  }

  if (password === confirmPassword) {
    removeAlert();
    console.log("as senhas são iguais");
  } else {
    event.preventDefault();
    removeAlert();

    passwordEl.classList.add("border-red");
    confirmPasswordEl.classList.add("border-red");

    const alert = createAlert();
    formEl.appendChild(alert);
    console.log("as senhas não são iguais");
  }
}

const form = document.getElementById("form");
form.addEventListener("submit", submit);
