// const config = require("./config");
const { Client } = require("pg");

const logQuery = (statement, parameters) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
};

// const isProduction = (config.NODE_ENV === "production");
const CONNECTION = {
  host: "/var/run/postgresql",
  port: 5432,
  user: "gianni",
  database: "vps_todos",
};

module.exports = {
  async dbQuery(statement, ...parameters) {
    let client = new Client(CONNECTION);

    await client.connect();
    logQuery(statement, parameters);
    let result = await client.query(statement, parameters);
    await client.end();

    return result;
  }
};
