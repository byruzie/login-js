export function makeInvisible(element) {
  element.classList.add("hidden");
}

export function makeVisible(element) {
  element.classList.remove("hidden");
}

export function navegation(fromEl, toEl) {
  makeInvisible(fromEl);
  makeVisible(toEl);

  // limpa todos os inputs do formulário visível e oculto
  const forms = fromEl.querySelectorAll("form");
  forms.forEach((form) => form.reset());

  // limpa listas de validação de senha
  const conditionList = document.getElementById("condition-list");
  if (conditionList) conditionList.remove();

  const defaultListEl = document.getElementById("default-list");
  if (defaultListEl) defaultListEl.classList.add("hidden");
}
