const connection = require("../db/connection");
const bcrypt = require("bcrypt");

class UserModel {
  listUsers() {
    const sql = "SELECT id, nome, email FROM users";
    return connection.query(sql).then(res => res.rows);
  }

  async createUser(newUser) {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const sql = "INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email";
    const values = [newUser.name, newUser.email, hashedPassword];
    const res = await connection.query(sql, values);
    return res.rows[0];
  }

  async verifyCredentials(email, password) {
    const sql = "SELECT * FROM users WHERE email = $1";
    const res = await connection.query(sql, [email]);

    if (res.rows.length === 0) return null;

    const user = res.rows[0];
    const match = await bcrypt.compare(password, user.senha);
    if (!match) return null;

    // Retorna apenas os dados públicos
    return { id: user.id, name: user.nome, email: user.email };
  }
}

module.exports = new UserModel();

