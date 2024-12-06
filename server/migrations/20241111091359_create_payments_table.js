/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('payments', (table) => {
      table.increments('payment_id').primary();
      table.integer('ticket_id').unsigned().notNullable()
           .references('ticket_id').inTable('tickets')
           .onDelete('CASCADE')
           .onUpdate('CASCADE');
      table.string('payment_method').notNullable();
      table.decimal('amount', 10, 2).notNullable();
      table.string('status').defaultTo('Success');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('payments');
  };
  