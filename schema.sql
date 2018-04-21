DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products	(
item_id Integer NOT NULL auto_increment,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price  Decimal (10, 2) NOT NULL ,
stock_quantity INTEGER default 0 NOT NULL,  
primary key (item_id)
)

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("pool noodle", "recreation", 9.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("lawn mower", "lawn/garden", 129.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("compost", "lawn/garden", 2.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("headphones", "electronics", 50.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("selfie stick", "electronics", 4.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("stapler", "office", 15.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("bar stool", "furniture", 39.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("mouse pad", "electronics", 12.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("scissors", "office", 6.99, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("hdmi cable", "electronics", 19.99, 20);

alter user 'root'@'localhost' identified by '12345'
