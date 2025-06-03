const connection = require("../db/connection");

class UserModel {
  listUsers() {
    const sql = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, response) => {
        if (error) {
          console.log("Erro na lista de usuários:", error.message);
          return reject(error);
        }
        console.log("Lista de usuários obtida com sucesso");
        resolve(response.rows);
      });
    });
  }

  createUser(newUser) {
    const sql = "INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *";
    const values = [newUser.nome, newUser.email, newUser.senha]; // <-- campos em português

    return new Promise((resolve, reject) => {
      console.log("Dados recebidos:", newUser); // log pra debug
      connection.query(sql, values, (error, response) => {
        if (error) {
          console.log("Erro na criação de usuário:", error.message);
          return reject(error);
        }
        console.log("Usuário criado com sucesso");
        resolve(response.rows[0]);
      });
    });
  }

  verifyCredentials(email, password) {
    const sql = "SELECT * FROM users WHERE email = $1";

    return new Promise((resolve, reject) => {
      connection.query(sql, [email], (err, results) => {
        if (err) return reject(err);
        if (results.rows.length === 0) return resolve(null);

        const user = results.rows[0];
        if (user.senha === password) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }
}

module.exports = new UserModel();

