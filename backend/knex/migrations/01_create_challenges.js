/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("challenge", function (table) {
    table.increments("id");
    table.string("title", 255).notNullable();
    table.text("description").notNullable();
    table.date("date").defaultTo(knex.fn.now());
    table.integer("created_by").unsigned().references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema
    .dropTable("challenge")
};
