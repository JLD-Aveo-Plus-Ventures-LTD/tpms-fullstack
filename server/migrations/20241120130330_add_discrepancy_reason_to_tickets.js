/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('tickets', (table) => {
      table.string('discrepancy_reason').nullable().after('status');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.alterTable('tickets', (table) => {
      table.dropColumn('discrepancy_reason');
    });
  };
  