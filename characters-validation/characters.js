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

function createCondition(ul, conditionLabel, conditionId) { // cria uma condição
  const li = document.createElement("li");
  li.textContent = conditionLabel;
  li.id = conditionId;
  ul.appendChild(li);
}

function openConditions() {
  // abre a lista de condições que a senha precisa ter apenas se não tiver uma aberta
  let ul = document.getElementById("condition-list");
  if (ul == null) {
    createUl();
  }
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

  const conditionsContainer = document.getElementById("conditions-container");

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
}

passwordEl.addEventListener("input", characterValidator);
passwordEl.addEventListener("click", openConditions);

document.addEventListener("click", function (event) {
  // reconhece o clique de todo lugar menos o input password
  if (event.target.id !== "password") {
    closeConditions();
  }
});
