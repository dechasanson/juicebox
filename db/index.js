const { Client } = require("pg");

const password = process.env.PASSWORD;

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username 
    FROM users;
  `
  );

  return rows;
}

async function createUser({ username, password }) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, password]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

const client = new Client(
  `postgres://postgres:${password}@localhost:5432/juiceboxdev`
);

module.exports = {
  client,
  getAllUsers,
  createUser,
};
