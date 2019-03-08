const mongoose = require("mongoose");

const connectToDB = dbUrl => mongoose.connect(dbUrl, { useNewUrlParser: true });

module.exports = connectToDB;
