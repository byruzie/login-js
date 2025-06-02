const connection = require("../db/connection");
class UserModel {
  listUsers() {
  const sql = "SELECT * FROM users";
  return new Promise((resolve, reject) => {
    connection.query(sql, {}, (error, response) => {
      if (error) {
        console.log("Erro na lista de usuários:", error.message);
        return reject(error);
      }

      console.log("Lista de usuários obtida com sucesso");
      resolve(response);
    });
  });
}

  createUser(newUser) {
  const sql = "INSERT INTO users SET ?";
  return new Promise((resolve, reject) => {
    connection.query(sql, newUser, (error, response) => {
      if (error) {
        console.log("Erro na criação de usuário:", error.message);
        return reject(error);
      }

      console.log("Usuário criado com sucesso");
      resolve(response);
    });
  });
}

  verifyCredentials(email, password) {
    const sql = "SELECT * FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
      connection.query(sql, [email], (err, results) => {
        if (err) return reject(err);

        if (results.length === 0) return resolve(null); // usuário não encontrado

        const user = results[0];

        if (user.password === password) {
          resolve(user);
        } else {
          resolve(null); // senha incorreta
        }
      });
    });
  }
}

module.exports = new UserModel();
