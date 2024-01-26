// const config = require("./config");
const { Client } = require("pg");

const logQuery = (statement, parameters) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
};

// const isProduction = (config.NODE_ENV === "production");
const CONNECTION = {
  connectionString: "postgresql://localhost/vps-todos",
  ssl: false, // Do I want ssl between Nginx and Express?
  // ssl: { rejectUnauthorized: false },
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
