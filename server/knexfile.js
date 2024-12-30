// Load environment variables from the .env file into process.env
require("dotenv").config();

// Export the configuration for Knex
module.exports = {
  // Development environment configuration
  development: {
    // Define the database client. Using mysql2 for better performance and compatibility.
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1", // Default to 127.0.0.1 if DB_HOST is not set
      user: process.env.DB_USER || "root",     // Default to "root" if DB_USER is not set
      password: process.env.DB_PASSWORD || "", // Default to no password if DB_PASSWORD is not set
      database: process.env.DB_NAME || "ticket_payment_db", // Default to "ticket_payment_db" if DB_NAME is not set
      port: process.env.DB_PORT || 3306,       // Default to 3306 if DB_PORT is not set
    },
    migrations: {
      // Directory where migration files are stored
      directory: "./migrations",
    },
    seeds: {
      // Directory where seed files are stored
      directory: "./seeds",
    },
  },

  // Production environment configuration
  production: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,     // No defaults in production; all must be explicitly set
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
