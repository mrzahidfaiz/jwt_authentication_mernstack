require('dotenv').config();

const PORT = process.env.PORT;
const DB_CONN_STRING = process.env.DB_CONN_STRING;

module.exports = {
    PORT,
    DB_CONN_STRING
}