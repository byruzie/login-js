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
