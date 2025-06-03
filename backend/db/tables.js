class Tables {
  async init(pool) {
    this.pool = pool;
    await this.createTable();
  }

  async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL
      )
    `;

    try {
      await this.pool.query(sql);
      console.log("A tabela 'users' já existe ou foi criada com sucesso.");
    } catch (error) {
      console.error("Erro ao criar tabela:");
      console.error(error.message);
    }
  }
}

module.exports = new Tables();

