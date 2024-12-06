/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('tickets', (table) => {
      table.decimal('total_price', 10, 2).defaultTo(0.0); // Add total price column
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('tickets', (table) => {
      table.dropColumn('total_price'); // Remove total price column
    });
  };
