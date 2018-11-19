// declare required elements
const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

// Variable for SQL Password
const sqlPw = process.env.SQL_PASSWORD;

// Varibale for connection to server
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: sqlPw,
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayProducts();
});

const displayProducts = () => {
    console.log("Welcome to Bamazon, here's what we currently have availale:");
    connection.query("SELECT * FROM products",
        (err, data) => {
            if (err) {
                throw err;
            }
            data.forEach(row => console.log(`ID: ${row.item_id}\nProduct: ${row.product_name}\nPrice: ${row.price}\n----`));
        }
    );
    connection.end();
};
