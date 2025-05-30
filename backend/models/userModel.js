const connection = require("../db/connection");
class UserModel {
  listUsers() {
    const sql = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
      connection.query(sql, {}, (error, response) => {
        if (error) {
          console.log("deu erro na lista de usuário");
          reject(error);
        }
        console.log("a lista de usuário deu certo");
        resolve(response);
      });
    });
  }

  createUser(newUser) {
    const sql = "INSERT INTO users SET ?";
    return new Promise((resolve, reject) => {
      connection.query(sql, newUser, (error, response) => {
        if (error) {
          console.log("deu erro na criação de usuário");
          reject(error);
        }
        console.log("a criação de usuário deu certo");
        resolve(response);
      });
    });
  }
}

module.exports = new UserModel();
