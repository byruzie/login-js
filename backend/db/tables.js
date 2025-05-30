class Tables {
  init(connection) {
    this.connection = connection;
    this.createTable();
  }

  createTable() {
    const sql = `
            CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            senha VARCHAR(255) NOT NULL
            );
        `;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log("erro na hora de criar tabela");
        console.log(error.message);
        return;
      }
      console.log("tabela criada");
    });
  };
}

module.exports = new Tables();
