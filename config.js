const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const { PORT, HOST, HOST_URL, EXTERNAL_API } = process.env;

module.exports = {
  port: PORT,
  host: HOST,
  host_url: HOST_URL,
  external_url: EXTERNAL_API,
};
