function submit(event) { // função que dá submit quando apertam o botão de save
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const confirmPasswordEl = document.getElementById("confirm-password");
  const formEl = document.getElementById("form-div");

  const password = passwordEl.value;
  const confirmPassword = confirmPasswordEl.value;

  let alertPassword = document.getElementById("p-alert");

  function createAlert() { // cria elemento que avisa que as senhas não estão iguais 
    const alert = document.createElement("p");
    alert.textContent = "Passwords don't match";
    alert.id = "p-alert";
    alert.classList.add("p-alert");

    return alert;
  }

  function removeAlert() { // remove o elemento de alerta
    if(alertPassword){
        formEl.removeChild(alertPassword);
        alertPassword = null; // reseta o valor de alertPassword
    }
    passwordEl.classList.remove("border-red");
    confirmPasswordEl.classList.remove("border-red");
  }

  if (password === confirmPassword) { // cria uma condição que só salva quando as senhas são iguais
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