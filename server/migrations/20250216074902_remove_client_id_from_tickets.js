/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('tickets', (table) => {
      table.dropColumn('client_id'); // Remove client_id column
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.alterTable('tickets', (table) => {
      table.integer('client_id').notNullable(); // Re-add client_id in case of rollback
    });
  };
  