DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR (100),
    department_name VARCHAR (100),
    price DECIMAL (6,2),
    stock_quantity INT,
	PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lavender", "essential oils", 30.50, 20),
	   ("rose", "essential oils", 42.50, 10),
       ("tummy tea", "teas", 12.00, 10);


       
       ///
         {message: "How many would you like to purchase?",
         name: "quantity", 
         validate: function(input) {
             if (isNaN(input)) {
             return "Please enter a numeric quantity.";
            }
            
        }

         }