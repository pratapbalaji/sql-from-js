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

function getFamousPersonByName(name, callback) {
  knex.select('id', 'first_name', 'last_name', 'birthdate').from('famous_people')
  .where('first_name', '=', name)
  .orWhere('last_name', '=', name)
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    callback(name, rows);
    knex.destroy();
  });

}

function printFamousPerson(name, result) {
  console.log('Searching ...');
  console.log('Found ' + result.length + ' by the name ' + name);
  for (let i = 0; i < result.length; i++) {
    let birthDate = new Date(result[i].birthdate);
    let formattedDate = birthDate.getFullYear() + "-" + (birthDate.getMonth()+1) + "-" + birthDate.getDate();
    console.log('- ' + result[i].id + ': ' + result[i].first_name + ' ' + result[i].last_name + ', born ' + formattedDate);
  }
}

getFamousPersonByName(process.argv[2], printFamousPerson);