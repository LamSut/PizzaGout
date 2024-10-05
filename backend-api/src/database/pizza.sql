-- DROP DATABASE pizza
CREATE DATABASE pizza;
USE pizza;
GRANT FILE on *.* TO 'root'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
flush privileges;

-- DROP TABLE admin;
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
-- SELECT * FROM admin;

-- DROP TABLE product
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    image VARCHAR(255) DEFAULT NULL
);
insert into product values (1,'aa','Pizza','abc',100,NULL);
insert into product values (2,'bb','Pizza','def',200,NULL);
insert into product values (3,'cc','Drink','ghi',300,NULL);
insert into product values (4,'dd','Pizza','jkl',500,NULL);
insert into product values (5,'ee','Pizza','mno',600,NULL);

-- DROP TABLE cart
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DROP TABLE item
CREATE TABLE item (
    cart_id INT,
    product_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES cart(id),
    FOREIGN KEY (product_id) REFERENCES product(id),
    UNIQUE (cart_id, product_id)
);