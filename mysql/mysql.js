var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "db4free.net",
  port: "3306",
  user: "bkgq23kgk",
  password: "kgw2kegwkgkw2g",
  database: "jwgjvkwkeg"
});
console.log("Connected to MySQL...");
function addUser(id, username, last_name, timezone) {
  var sql =
    "INSERT INTO user (`id`, `username`, `last_name`, `timezone`) VALUES(" +
    id +
    ",'" +
    username +
    "','" +
    last_name +
    "','" +
    timezone +
    "'" +
    ") ON DUPLICATE KEY UPDATE " +
    "username='" +
    username +
    "', last_name='" +
    last_name +
    "', timezone='" +
    timezone +
    "'";
  connection.query(
    {
      sql: sql
    },
    function(error, results, fields) {
      if (error) throw error;
    }
  );
}
function getUserTimeZone(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      {
        sql: "SELECT user.timezone FROM user WHERE user.id=?",
        values: [id]
      },
      function(error, results, fields) {
        if (error) throw error;
        resolve(results[0]["timezone"]);
      }
    );
  });
}
function addRemind(userID, text, month, day, hours, minutes) {
  console.log("HI");
  connection.query(
    {
      sql:
        "INSERT INTO reminder (`id_user`, `text`, `month`, `day`, `hours`, `minutes`) VALUES(?, ?, ?, ?, ?, ?)",
      values: [userID, text, month, day, hours, minutes]
    },
    function(error, results, fields) {
      if (error) throw error;
    }
  );
}

function removeRemind(id) {
  connection.query(`DELETE FROM reminder WHERE id='${id}'`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
  });
}
function getReminds() {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM reminder`, (error, results, fields) => {
      if (error) throw error;
      resolve(results);
    });
  });
}
const checkExist = (table, id) => {
  return new Promise((resolve, reject) => {
    /*stuff using username, password*/

    connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, function(
      error,
      results,
      fields
    ) {
      if (error) throw error;

      if (results.length == 0) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports.addUser = addUser;
module.exports.checkExist = checkExist;
module.exports.addRemind = addRemind;
module.exports.removeRemind = removeRemind;
module.exports.getReminds = getReminds;
module.exports.getUserTimeZone = getUserTimeZone;
