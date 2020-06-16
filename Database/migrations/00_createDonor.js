
exports.up = function(knex){
  return knex.schema.createTable('donors', table=>{
    table.increments('id').primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("blood", 3).notNullable(); 

  })
}
exports.down = function(knex) {
   knex.schema.dropTable('donors');
}
