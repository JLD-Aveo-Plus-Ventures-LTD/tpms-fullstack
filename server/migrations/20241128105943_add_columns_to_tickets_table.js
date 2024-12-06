/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
exports.up = function(knex) {
  return knex.schema.alterTable('tickets', (table) => {
    table.string('ticket_code').notNullable().comment('Auto-generated alphanumeric ID');
    table.string('client_name').nullable().comment("Optional client's name");
    table.string('client_phone').nullable().comment("Optional client's phone number");
    table.decimal('total_price', 10, 2).defaultTo(0.00).comment('Total price of all services');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('tickets', (table) => {
    table.dropColumn('ticket_code');
    table.dropColumn('client_name');
    table.dropColumn('client_phone');
    table.dropColumn('total_price');
  });
};

  