const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Sjyjy8600!",
    database: "techtrek24",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

module.exports = {
    query: async (sql, params) => {
      const [rows, fields] = await db.execute(sql, params);
      return rows;
    },
  };