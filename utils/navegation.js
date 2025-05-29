// Função que ativa o display de um elemento e desativa o display de outro
export function changeDiv(firstEl, secondEl) { 
  const firstInactive = firstEl.classList.contains("inactive");
  const secondInactive = secondEl.classList.contains("inactive");

  if (secondInactive) {
    firstEl.classList.add("inactive");
    secondEl.classList.remove("inactive");
  } else if (firstInactive) {
    secondEl.classList.add("inactive");
    firstEl.classList.remove("inactive");
  }
}