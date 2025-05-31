// para cada condição ele cria um verificador (matched: true/false), retorna uma array com objetos { id, label, regex, matched }
export function validatePassword(inputValue, conditions) {
  return conditions.map((condition) => ({
    ...condition,
    matched: condition.regex.test(inputValue),
  }));
}

// cria uma ul que recebe li para cada condição
export function createConditionList(containerEl, conditions) {
  const ul = document.createElement("ul");
  ul.id = "condition-list";
  ul.classList.add("condition-list");

  conditions.forEach(({ id, label }) => {
    const li = document.createElement("li");
    li.textContent = label;
    li.id = id;
    ul.appendChild(li);
  });

  containerEl.appendChild(ul);
}

export function updateConditionList(containerEl, conditionsStatus) {
  const ul = document.getElementById("condition-list");

  // atualiza os itens da lista de condição
  conditionsStatus.forEach(({ id, label, matched }) => {
    const existing = document.getElementById(id);

    // se matched for true e a condição ainda existir, ela remove a condição
    // se matched for false, a condição não existir e a ul ainda existir, cria a condição que falta
    if (matched && existing) {
      existing.remove();
    } else if (!matched && !existing && ul) {
      const li = document.createElement("li");
      li.textContent = label;
      li.id = id;
      ul.appendChild(li);
    }
  });

  // remove a ul se todas as condições foram atendidas
  const allPassed = conditionsStatus.every(({ matched }) => matched);
  if (allPassed && ul) {
    ul.remove();
  }
}

// mostra uma lista padrão de condições se não tem senha digitada, nenhuma outra lista está criada e a lista não está escondida
export function toggleDefaultConditionList(inputEl, defaultListEl, conditions) {
  const allMet = conditions.every((condition) => condition.regex.test(inputEl.value));
  const conditionListExists = document.getElementById("condition-list");

  if (!conditionListExists && !allMet && defaultListEl.classList.contains("hidden")) {
    defaultListEl.classList.remove("hidden");
  }
}
