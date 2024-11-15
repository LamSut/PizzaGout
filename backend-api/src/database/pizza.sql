-- DROP DATABASE pizza
CREATE DATABASE pizza;
USE pizza;
GRANT FILE on *.* TO 'root'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
flush privileges;

-- DROP TABLE product
CREATE TABLE product (
    productid INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    image VARCHAR(255) DEFAULT NULL
);

-- DROP TABLE cart
CREATE TABLE cart (
    cartid INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DROP TABLE item
CREATE TABLE item (
    cartid INT,
    productid INT,
    quantity INT NOT NULL,
    FOREIGN KEY (cartid) REFERENCES cart(cartid),
    FOREIGN KEY (productid) REFERENCES product(productid),
    UNIQUE (cartid, productid)
);