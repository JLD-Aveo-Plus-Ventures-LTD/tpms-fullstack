/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('services', (table) => {
      table.increments('service_id').primary(); // Primary key for each service
      table.integer('ticket_id').unsigned().notNullable(); // Foreign key to tickets
      table.string('service_name').notNullable(); // Name of the service
      table.integer('render_count').defaultTo(1); // Number of times the service was rendered
      table.timestamps(true, true); // Created_at and updated_at timestamps
  
      // Set up foreign key relationship
      table
        .foreign('ticket_id')
        .references('ticket_id')
        .inTable('tickets')
        .onDelete('CASCADE'); // Cascade delete services if the ticket is deleted
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('services');
  };
  