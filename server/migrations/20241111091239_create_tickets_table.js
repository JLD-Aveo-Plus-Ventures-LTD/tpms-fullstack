/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tickets', (table) => {
      table.increments('ticket_id').primary();
      table.integer('staff_id').notNullable();
      table.integer('client_id').notNullable();
      table.string('service_details').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.string('status').defaultTo('Pending');
      table.timestamps(true, true); // created_at and updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tickets');
  };
  