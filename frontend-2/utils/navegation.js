export function makeInvisible(element) {
  element.classList.add("hidden");
}

export function makeVisible(element) {
  element.classList.remove("hidden");
}

export function navegation(firstEl, secondEl) {
  const firstHidden = firstEl.classList.contains("hidden");
  const secondHidden = secondEl.classList.contains("hidden");

  if (firstHidden) {
    makeVisible(firstEl);
    makeInvisible(secondEl);
  } else if (secondHidden) {
    makeVisible(secondEl);
    makeInvisible(firstEl);
  }
}
