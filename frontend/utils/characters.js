export function characterValidator(inputEl, containerEl, conditionsArray) {
  let ul = document.getElementById("condition-list");

  function removeUl() {
    // remove lista
    if (ul) {
      containerEl.removeChild(ul);
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

  // abre a lista de condições que a senha precisa ter apenas se não tiver uma aberta
  if (ul == null) {
    ul = document.createElement("ul");
    ul.id = "condition-list";
    ul.classList.add("condition-list");
    containerEl.appendChild(ul);

    conditionsArray.forEach((condition) => {
      createCondition(ul, condition.label, condition.id);
    });
  }

  conditionsArray.forEach((condition) => {
    const exist = document.getElementById(condition.id);
    const match = condition.regex.test(inputEl.value);

    if (exist && match) {
      exist.remove();
    } else if (!match && !exist) {
      createCondition(ul, condition.label, condition.id);
    }
  });

  const allConditionsMet = conditionsArray.every(
    (
      condition // remove o elemento ul quando todas as condições forem atendidas
    ) => condition.regex.test(inputEl.value)
  );

  if (allConditionsMet && ul) {
    removeUl();
  }
}

export function openConditionsList(inputEl, defaultListEl, conditionsArray) {
  // verifica se o que ta sendo digitado na senha cumpre com os requisitos dela
  const allConditionsMet = conditionsArray.every((condition) =>
    condition.regex.test(inputEl.value)
  );

  let ul = document.getElementById("condition-list");

  if (
    !ul &&
    !allConditionsMet &&
    defaultListEl.classList.contains("inactive")
  ) {
    defaultListEl.classList.remove("inactive");
  }
}
