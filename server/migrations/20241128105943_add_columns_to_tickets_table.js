/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
exports.up = async function(knex) {
  const hasTicketCode = await knex.schema.hasColumn('tickets', 'ticket_code');
  const hasClientName = await knex.schema.hasColumn('tickets', 'client_name');
  const hasClientPhone = await knex.schema.hasColumn('tickets', 'client_phone');
  const hasTotalPrice = await knex.schema.hasColumn('tickets', 'total_price');

  return knex.schema.alterTable('tickets', (table) => {
    if (!hasTicketCode) table.string('ticket_code').notNullable().comment('Auto-generated alphanumeric ID');
    if (!hasClientName) table.string('client_name').nullable().comment("Optional client's name");
    if (!hasClientPhone) table.string('client_phone').nullable().comment("Optional client's phone number");
    if (!hasTotalPrice) table.decimal('total_price', 10, 2).defaultTo(0.00).comment('Total price of all services');
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
