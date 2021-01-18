require('dotenv').config();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "adheap"
});

connection.connect((err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("Connection to DB established successfully");
});

module.exports = connection;