/* Drop database if it exists and create database */
DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

/* Code to use database */
USE bamazon_DB;

/* Code to create table */
CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL, 
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL
);

/* Code to add products to table */
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Try Not To Suck", "Books", 19.99, 10), 
("Nintendo Switch", "Electronics", 299.99, 10),
("Pokemon: Let's Go, Pikachu!", "Electronics", 59.99, 10),
("Couch", "Furniture", 499.99, 10),
("Jeans", "Clothing", 59.99, 10),
("Shoes", "Clothing", 49.99, 10),
("Gloves", "Clothing", 9.99, 10),
("Microwave", "Appliances", 149.99, 10),
("Shower Curtain", "Domestics", 14.99, 10),
("Charlie Brown Christmas Tree", "Holiday", 14.99, 10);

SELECT * FROM products;