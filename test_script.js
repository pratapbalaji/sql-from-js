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
    callback(result.rows);
    client.end();
    });
  });
}

getFamousPersonByName(process.argv[2], (result) => {
  console.log(result);
});