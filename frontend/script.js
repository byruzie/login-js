// navegation.js
import { changeDiv } from "../utils/navegation.js";
import { characterValidator, openConditionsList } from "../utils/characters.js";
import { submit } from "../utils/passwords.js";

const signInEl = document.getElementById("sign-in");
const signUpEl = document.getElementById("sign-up");
const signInLink = document.getElementById("signin-link");
const signUpLink = document.getElementById("signup-link");

signInLink.addEventListener("click", () => changeDiv(signInEl, signUpEl));
signUpLink.addEventListener("click", () => changeDiv(signUpEl, signInEl));

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

passwordEl.addEventListener("input", () =>
  characterValidator(passwordEl, passwordDiv, conditions)
);
passwordEl.addEventListener("click", () =>
  openConditionsList(passwordEl, document.getElementById("default-list"), conditions)
);

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

// password.js

const form = document.getElementById("form-signup");
form.addEventListener("submit", submit);