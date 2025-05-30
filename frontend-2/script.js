const form = document.getElementById("userForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const result = await response.json();
      console.log("Usuário criado:", result);
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
    }
  });