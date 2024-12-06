/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table("services", (table) => {
      table.decimal("price", 10, 2).notNullable().comment("Service price");
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.table("services", (table) => {
      table.dropColumn("price");
    });
  };
  