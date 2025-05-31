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
