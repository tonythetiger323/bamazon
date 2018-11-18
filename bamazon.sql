DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL, 
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Try Not To Suck", "Books", 20.00, 10), 
("Nintendo Switch", "Electronics", 300.00, 10),
("Pokemon: Let's Go, Pikachu!", "Electronics", 60.00, 10),
("Couch", "Furniture", 500.00, 10),
("Jeans", "Clothing", 60.00, 10),
("Shoes", "Clothing", 50.00, 10),
("Gloves", "Clothing", 10.00, 10),
("Microwave", "Appliances", 150.00, 10),
("Shower Curtain", "Domestics", 15.00, 10),
("Charlie Brown Christmas Tree", "Holiday", 15.00, 10);

SELECT * FROM products;