// migrations/<timestamp>_create_users_table.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('user_id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable(); // Store hashed password
      table.string('role').notNullable(); // "admin", "cashier", "operation_staff"
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  