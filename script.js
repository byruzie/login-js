// navegation.js

const signInEl = document.getElementById("sign-in");
const signUpEl = document.getElementById("sign-up");

const signInLink = document.getElementById("signin-link");
const signUpLink = document.getElementById("signup-link");

function changeDiv() {
  const signInInactive = signInEl.classList.contains("inactive");
  const signUpInactive = signUpEl.classList.contains("inactive");

  if (signUpInactive) {
    signInEl.classList.add("inactive");
    signUpEl.classList.remove("inactive");
  } else if (signInInactive) {
    signUpEl.classList.add("inactive");
    signInEl.classList.remove("inactive");
  }
}

signInLink.addEventListener("click", changeDiv);
signUpLink.addEventListener("click", changeDiv);

////////////////////////////////////////////////////////////////////////////////////////
// characters.js

const passwordEl = document.getElementById("password");
const passwordDiv = document.getElementById("password-container");

const conditions = [
  {
    id: "condition-0",
    regex: /[A-Z]/,
    label: "At least 1 uppercase letter",
  },
  {
    id: "condition-1",
    regex: /[a-z]/,
    label: "At least 1 lowercase letter",
  },
  {
    id: "condition-2",
    regex: /[!@#$%^&*(),.?":{}|<>]/,
    label: "At least 1 special character",
  },
  {
    id: "condition-3",
    regex: /[0-9]/,
    label: "At least 1 number",
  },
];

function createUl() {
  // cria lista
  const ul = document.createElement("ul");
  ul.id = "condition-list";
  ul.classList.add("condition-list");
  passwordDiv.appendChild(ul);

  conditions.forEach((condition) => {
    createCondition(ul, condition.label, condition.id);
  });
  return ul;
}

function removeUl() {
  // remove lista
  let ul = document.getElementById("condition-list");
  if (ul) {
    passwordDiv.removeChild(ul);
    ul = null;
  }
}

function createCondition(ul, conditionLabel, conditionId) {
  // cria uma condição
  const li = document.createElement("li");
  li.textContent = conditionLabel;
  li.id = conditionId;
  ul.appendChild(li);
}

function closeConditions() {
  // fecha a lista de condições da senha se receber click fora do input password
  let ul = document.getElementById("condition-list");
  if (ul) {
    removeUl();
  }
}

function characterValidator() {
  // verifica se o que ta sendo digitado na senha cumpre com os requisitos dela
  const password = passwordEl.value;
  let ul = document.getElementById("condition-list");

  const defaultListEl = document.getElementById("default-list");
  const defaultExist = defaultListEl.classList.contains("inactive");
  if (defaultExist == false) {
    defaultListEl.classList.add("inactive");
  }

  // abre a lista de condições que a senha precisa ter apenas se não tiver uma aberta
  if (ul == null) {
    createUl();
  }

  conditions.forEach((condition) => {
    const exist = document.getElementById(condition.id);
    const match = condition.regex.test(password);

    if (exist && match) {
      exist.remove();
    } else if (!match && !exist) {
      let ul = document.getElementById("condition-list");
      createCondition(ul, condition.label, condition.id);
    }
  });

  const allConditionsMet = conditions.every(
    (
      condition // remove o elemento ul quando todas as condições forem atendidas
    ) => condition.regex.test(password)
  );
  if (allConditionsMet && ul) {
    removeUl();
  }
}

function openConditionsList() {
  const defaultListEl = document.getElementById("default-list");
  const defaultExist = defaultListEl.classList.contains("inactive");
  let ul = document.getElementById("condition-list");

  if (ul == null) {
    if (defaultExist) {
      defaultListEl.classList.remove("inactive");
    }
  }
}

passwordEl.addEventListener("input", characterValidator);
passwordEl.addEventListener("click", openConditionsList);

document.addEventListener("click", function (event) {
  // reconhece o clique de todo lugar menos o input password
  if (event.target.id !== "password") {
    const defaultListEl = document.getElementById("default-list");
    const defaultExist = defaultListEl.classList.contains("inactive");
    if (defaultExist == false) {
      defaultListEl.classList.add("inactive");
    }
  }
});

////////////////////////////////////////////////////////////////////////////////////////
// password.js

function submit(event) {
  // função que dá submit quando apertam o botão de save
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const confirmPasswordEl = document.getElementById("confirm-password");
  const formEl = document.getElementById("form-div");

  const password = passwordEl.value;
  const confirmPassword = confirmPasswordEl.value;

  let alertPassword = document.getElementById("p-alert");

  function createAlert() {
    // cria elemento que avisa que as senhas não estão iguais
    const alert = document.createElement("p");
    alert.textContent = "Passwords don't match";
    alert.id = "p-alert";
    alert.classList.add("p-alert");

    return alert;
  }

  function removeAlert() {
    // remove o elemento de alerta
    if (alertPassword) {
      formEl.removeChild(alertPassword);
      alertPassword = null; // reseta o valor de alertPassword
    }
    passwordEl.classList.remove("border-red");
    confirmPasswordEl.classList.remove("border-red");
  }

  if (password === confirmPassword) {
    // cria uma condição que só salva quando as senhas são iguais
    removeAlert();
    signUpEl.classList.add("inactive");
    signInEl.classList.remove("inactive");
  } else {
    event.preventDefault();
    removeAlert();

    passwordEl.classList.add("border-red");
    confirmPasswordEl.classList.add("border-red");

    const alert = createAlert();
    formEl.appendChild(alert);
  }
}

const form = document.getElementById("form");
form.addEventListener("submit", submit);
