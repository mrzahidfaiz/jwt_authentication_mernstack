const mongoose = require('mongoose');
const {DB_CONN_STRING} = require('../config/index');

const dbConnection = async () => {
    try {
        await mongoose.connect(DB_CONN_STRING);
        console.log(`database is connected!`)
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbConnection;