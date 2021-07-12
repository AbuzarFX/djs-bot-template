const { reconDB } = require("reconlx")
const bot = require("./index")
const db = new reconDB(bot, {
    uri: "MONGO_URI",
});

module.exports = db;
