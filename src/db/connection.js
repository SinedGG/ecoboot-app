const pgp = require("pg-promise")();

var db = null;

function connect(ip, user, pasw) {
  return new Promise((resolve, reject) => {
    db = pgp({
      user: user,
      password: pasw,
      host: ip,
      port: 5432,
      database: "weather",
    });
    db.any(`SELECT NOW()`)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
}

function getPool() {
  return db;
}

module.exports = { getPool, connect };
