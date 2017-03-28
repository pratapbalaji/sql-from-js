const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function getFamousPersonByName(name, callback) {
  client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    callback(name, result.rows);
    client.end();
    });
  });
}

function printFamousPerson(name, result) {
  console.log('Searching ...');
  console.log('Found ' + result.length + ' by the name ' + name);
  for (let i = 0; i < result.length; i++) {
    let birthDate = new Date(result[i].birthdate);
    let formattedDate = birthDate.getFullYear() + "-" + (birthDate.getMonth()+1) + "-" + birthDate.getDate();
    console.log('- ' + result[i].id + ': ' + result[i].first_name + ' ' + result[i].last_name + ', born ' + formattedDate + birthDate);
  }
}

getFamousPersonByName(process.argv[2], printFamousPerson);