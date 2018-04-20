const Sequelize = require("sequelize");
const path = require('path');

let configPath = path.join(__dirname, "config/config.json");
const config = require(configPath);

if(!config || !config.user){
    console.error("Config file is missing.");
}

const sequelize = new Sequelize(config.database, config.user, config.password, config.options)
module.exports = sequelize;