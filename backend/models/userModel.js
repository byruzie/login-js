const connection = require("../db/connection");
const bcrypt = require("bcrypt");

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
        resolve(response.rows); // .rows é padrão no pg
      });
    });
  }

  createUser(newUser) {
    const sql =
      "INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *";
    const values = [newUser.name, newUser.email, newUser.password];

    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, response) => {
        if (error) {
          console.log("Erro na criação de usuário:", error.message);
          return reject(error);
        }

        console.log("Usuário criado com sucesso");
        resolve(response.rows[0]); // retorna o novo usuário criado
      });
    });
  }

  verifyCredentials(email, password) {
    const sql = "SELECT * FROM users WHERE email = $1";

    return new Promise(async (resolve, reject) => {
      try {
        const results = await connection.query(sql, [email]);

        if (results.rows.length === 0) {
          return resolve(null); // usuário não encontrado
        }

        const user = results.rows[0];

        // compara a senha enviada com a senha hash armazenada
        const senhaCorreta = await bcrypt.compare(password, user.password);

        if (senhaCorreta) {
          resolve(user); // senha correta, retorna o usuário
        } else {
          resolve(null); // senha incorreta
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = new UserModel();
