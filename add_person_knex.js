const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client   : 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

function addPersonByName(first_name, last_name, dob, callback) {
  knex('famous_people').insert([{'first_name': first_name, 'last_name': last_name, 'birthdate': dob}])
  .asCallback(function(err) {
    if (err) return console.error(err);
    callback();
    knex.destroy();
  });

}

addPersonByName(process.argv[2], process.argv[3], process.argv[4], () => {
  console.log("This record was added");
});