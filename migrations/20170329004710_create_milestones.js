
exports.up = function(knex) {
  return knex.schema.createTable('milestones', function(table){
    table.increments('id');
    table.string('description');
    table.date('date');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('milestones', function(table){
  });
};
