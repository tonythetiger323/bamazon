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
    startApp();
});

//function to run to start the app
const startApp = () => {
    console.log("Welcome to Bamazon, here's what we currently have availale:");
    connection.query("SELECT * FROM products",
        (err, data) => {
            if (err) {
                throw err;
            }
            data.forEach(row => console.log(`ID: ${row.item_id}\nProduct: ${row.product_name}\nPrice: ${row.price}\n----`));
        }
    );

    placeOrder();
};

const placeOrder = () => {
    // inquirer prompt asking which product would like to buy and how many, inquirer validates to make sure input entered is a number.
    inquirer.prompt([
        {
            name: "productId",
            type: "input",
            message: "Please enter the ID number of the product you would like to buy.",
            validate: (value) => {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "quatity",
            type: "input",
            message: "Please enter the quatity you would like to buy.",
            validate: (value) => {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then((answer) => {
        console.log(answer);
        connection.query(`
        SELECT product FROM bamazon WHERE item_id = ${answer.productID}`, (err, data) => {
                if (err) {
                    throw err;
                } else if (data.stock_quantity <= 0) {
                    console.log(`Insufficient quantity in stock! We currently have ${data.stock_quantity} in stock. Please try another order.`);
                    startApp();
                } else {
                    console.log("Thank you for your purchase, please give us moment to process your order!");
                    processOrder();
                }
            });
    });
};

const processOrder = () => {

}