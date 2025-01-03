require("dotenv").config(); // Load environment variables from .env

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST, // Use DB_HOST from .env
      user: process.env.DB_USER, // Use DB_USER from .env
      password: process.env.DB_PASSWORD, // Use DB_PASSWORD from .env
      database: process.env.DB_NAME, // Use DB_NAME from .env
      port: process.env.DB_PORT, // Use DB_PORT from .env
    },
    migrations: {
      directory: "./migrations", // Directory for migration files
    },
    seeds: {
      directory: "./seeds", // Directory for seed files
    },
  },
};
