const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL;

async function connect() {
    try {
        await mongoose.connect(DB_URL);
        console.log('Database is connected');
    } catch (error) {
        console.error('Error connecting to database' + error);
    }
}

module.exports = { connect };
