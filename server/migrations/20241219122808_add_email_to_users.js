/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = async function (knex) {
  // Check if the email column already exists
  const hasColumn = await knex.schema.hasColumn("users", "email");

  if (!hasColumn) {
    await knex.schema.table("users", function (table) {
      table.string("email").defaultTo("").after("username");
    });

    // Populate email for existing rows
    await knex("users").update({ email: knex.raw("CONCAT(username, '@example.com')") });

    // Alter the column to make it UNIQUE and NOT NULL
    await knex.schema.alterTable("users", function (table) {
      table.string("email").unique().notNullable().alter();
    });
  }
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.dropColumn("email");
  });
};
