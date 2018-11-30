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
        },
        placeOrder()
    )
};

//function to validate input is an integer greater than 0
const validateInput = (input) => {
    const value = parseInt(input);
    if (((isNaN(value)) === true) || (value <= 0)) {
        console.log(`\n Please enter a whole number that is greater than 0.`);
    } else {
        return true;
    }
};

const placeOrder = () => {
    // inquirer prompt asking which product would like to buy and how many, inquirer validates to make sure input entered is a number.
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Please enter the ID number of the product you would like to buy.",
            validate: validateInput
        },
        {
            name: "quantity",
            type: "input",
            message: "Please enter the quatity you would like to buy.",
            validate: validateInput
        }
    ]).then((answer) => {
        console.log(`You have selected, a quantity ${answer.quantity} of item with item ID:${answer.item_id}`);
        connection.query(`
        SELECT * FROM products WHERE ?`, { item_id: answer.item_id }, (err, data) => {
                if (err) {
                    throw err;
                }
                if (data.length === 0) {
                    console.log(`An incorrect item ID has been entered, ${answer.item_id} does not exist. Please try again.`);
                    placeOrder();
                } else {
                    const itemData = data[0];

                    if (answer.quantity > itemData.stock_quantity) {
                        console.log(`Insufficient quantity in stock! We currently have ${data.stock_quantity} in stock. Please try another order.`);
                        placeOrder();
                    } else {
                        console.log("Thank you for your purchase, please give us moment to process your order!");
                        connection.query(`UPDATE products SET stock_quantity = ${itemData.stock_quantity - answer.quantity} WHERE item_id = ${answer.item_id}`, (err, data) => {
                            if (err) {
                                throw err;
                            }
                            console.log(`Your order has been placed. Your final total is $${itemData.price * answer.quantity}\nThank you for your business!\n----`);

                        },
                            connection.end()
                        )
                    }
                }
            }
        )
    }
    )
};
