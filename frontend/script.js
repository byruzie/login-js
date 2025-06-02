// navegation
import { navegation, makeInvisible, makeVisible } from "./utils/navegation.js";

const signInEl = document.getElementById("sign-in");
const signUpEl = document.getElementById("sign-up");
const signInLink = document.getElementById("signin-link");
const signUpLink = document.getElementById("signup-link");

signInLink.addEventListener("click", () => navegation(signInEl, signUpEl));
signUpLink.addEventListener("click", () => navegation(signUpEl, signInEl));

// form sign in
const formIn = document.getElementById("loginForm");
const welcomeEl = document.getElementById("welcome");
const welcomeMessage = document.getElementById("welcomeMessage");

formIn.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formIn);
  const user = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const result = await response.json();

    if (response.ok) {
      // oculta a div de login
      makeInvisible(signInEl);
      // mostra a div de boas-vindas
      makeVisible(welcomeEl);
      // atualiza a div de boas-vindas
      welcomeMessage.innerText = `Welcome, ${result.user.name}!`;
    } else {
      alert("Email ou senha incorretos.");
    }
  } catch (err) {
    console.error("Erro no login:", err);
  }
});

// password rules 
import {
  validatePassword,
  createConditionList,
  updateConditionList,
  toggleDefaultConditionList,
} from "./utils/passwordRules.js";

const passwordSignup = document.getElementById("password-signup");
const ulContainer = document.getElementById("ul-container");
const defaultListEl = document.getElementById("default-list");

const conditions = [
  {
    id: "condition-uppercase",
    regex: /[A-Z]/,
    label: "At least 1 uppercase letter",
  },
  {
    id: "condition-lowercase",
    regex: /[a-z]/,
    label: "At least 1 lowercase letter",
  },
  {
    id: "condition-special",
    regex: /[!@#$%^&*(),.?":{}|<>]/,
    label: "At least 1 special character",
  },
  {
    id: "condition-number",
    regex: /[0-9]/,
    label: "At least 1 number",
  },
];

// ativa/atualiza lista quando digita
passwordSignup.addEventListener("input", () => {
  const conditionList = document.getElementById("condition-list");
  const validationResults = validatePassword(passwordSignup.value, conditions);

  if (!conditionList) {
    createConditionList(ulContainer, conditions);
    makeInvisible(defaultListEl);
  }
  updateConditionList(ulContainer, validationResults);
  makeVisible(ulContainer);
});

// mostra lista padrão ao clicar no input
passwordSignup.addEventListener("click", () => {
  const defaultInvisible = defaultListEl.classList.contains("hidden");

  if(defaultInvisible) {
    makeVisible(ulContainer);
  }
  toggleDefaultConditionList(passwordSignup, ulContainer, conditions);
});

// esconde lista padrão ao clicar fora do input
document.addEventListener("click", (e) => {
  if (e.target.id !== "password-signup" && e.target.id !== "toggle-signup" && !ulContainer.classList.contains("hidden")) {
    makeInvisible(ulContainer);
  }
});

// password view
import { toggleIcon } from "./utils/toggleIcon.js";

const passwordLogin = document.getElementById("password-login");
const iconLogin = document.getElementById("toggle-login");
const iconSignup = document.getElementById("toggle-signup");

iconLogin.addEventListener("click", () => {
  toggleIcon(passwordLogin, iconLogin);
});
iconSignup.addEventListener("click", () => {
  toggleIcon(passwordSignup, iconSignup);
});

// form sign up
const formUp = document.getElementById("signupForm");

formUp.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita reload

  const formData = new FormData(formUp);
  const user = Object.fromEntries(formData.entries()); // transforma os dados do form em objeto

  try {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // converte o objeto em json
    });

    const result = await response.json(); // espera resposta e tranforma em objeto
    console.log("Usuário criado:", result);
    makeInvisible(signUpEl);
    makeVisible(signInEl);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
  }
});
