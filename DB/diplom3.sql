CREATE DATABASE diplom;
USE diplom;

-- Create tables
CREATE TABLE seller (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_company VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(60) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    img TEXT NOT NULL,
    manufaction INT NOT NULL,
    description TEXT,
    category_id INT,
    forState ENUM('man', 'women', 'unisex'),
    color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (manufaction) REFERENCES seller(id) ON DELETE CASCADE
);

CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) not null,
    photo_description TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE product_image_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_image_id INT,
    img text NOT NULL,
    FOREIGN KEY (product_image_id) REFERENCES product_images(id) ON DELETE CASCADE
);

CREATE TABLE product_items (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    product_id VARCHAR(50) NOT NULL,
    size VARCHAR(15),
    quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(70) NOT NULL,
    phoneNumber VARCHAR(12) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('cancel', 'confirm', 'wait', 'wait delivery'),
    description_delivery TEXT,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_item_id int,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_item_id) REFERENCES product_items(id) ON DELETE CASCADE
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE seller_admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    company_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES seller(id) ON DELETE CASCADE
);

-- Create triggers
DELIMITER //

CREATE TRIGGER after_seller_delete
AFTER DELETE ON seller
FOR EACH ROW
BEGIN
    DELETE FROM products WHERE manufaction = OLD.id;
    DELETE FROM seller_admin WHERE company_id = OLD.id;
END //

CREATE TRIGGER after_product_delete
AFTER DELETE ON products
FOR EACH ROW
BEGIN
    DELETE FROM product_images WHERE product_id = OLD.id;
    DELETE FROM product_items WHERE product_id = OLD.id;
END //

CREATE TRIGGER after_product_image_delete
AFTER DELETE ON product_images
FOR EACH ROW
BEGIN
    DELETE FROM product_image_items WHERE product_image_id = OLD.id;
END //

CREATE TRIGGER after_order_delete
AFTER DELETE ON orders
FOR EACH ROW
BEGIN
    DELETE FROM order_items WHERE order_id = OLD.id;
END //

DELIMITER ;

-- Create stored procedures
DELIMITER //

CREATE PROCEDURE GetProductDetails(IN product_id VARCHAR(50))
BEGIN
    -- Select product details
    SELECT 
        p.id, 
        p.name, 
        p.img AS product_img, 
        p.manufaction, 
        p.category_id, 
        p.forState, 
        p.color, 
        p.created_at,
        b.name_company AS manufacture_name,
        c.name AS category_name
    FROM 
        products p
        JOIN seller b ON p.manufaction = b.id
        JOIN categories c ON p.category_id = c.id
    WHERE 
        p.id = product_id;

    -- Select product images
    SELECT 
        pi.id, 
        pi.product_id, 
        pii.img AS image_path 
    FROM 
        product_images pi
        JOIN product_image_items pii ON pi.id = pii.product_image_id
    WHERE 
        pi.product_id = product_id;

    -- Select product items (sizes and quantities)
    SELECT 
        id,
        product_id,
        size,
        quantity,
        created_at
    FROM 
        product_items
    WHERE 
        product_id = product_id;
END //

CREATE PROCEDURE GetProductImagesByProductId(IN product_id VARCHAR(50))
BEGIN
    -- Select product images
    SELECT 
        pi.id, 
        pi.product_id, 
        pi.photo_description,
        pii.img AS image_path 
    FROM 
        product_images pi
        JOIN product_image_items pii ON pi.id = pii.product_image_id
    WHERE 
        pi.product_id = product_id;
END //

CREATE PROCEDURE DeleteSeller(IN seller_id INT)
BEGIN
    -- Delete related product items
    DELETE pi FROM product_items pi
    JOIN products p ON pi.product_id = p.id
    WHERE p.manufaction = seller_id;

    -- Delete related product image items
    DELETE pii FROM product_image_items pii
    JOIN product_images pi ON pii.product_image_id = pi.id
    JOIN products p ON pi.product_id = p.id
    WHERE p.manufaction = seller_id;

    -- Delete related product images
    DELETE pi FROM product_images pi
    JOIN products p ON pi.product_id = p.id
    WHERE p.manufaction = seller_id;

    -- Delete related products
    DELETE FROM products WHERE manufaction = seller_id;

    -- Delete the seller
    DELETE FROM seller WHERE id = seller_id;
END //

DELIMITER ;

-- Insert sample data
INSERT INTO seller (name_company, email, telephone) VALUES
('Company A', 'emailA@company.com', '1234567890'),
('Company B', 'emailB@company.com', '0987654321');

INSERT INTO categories (name, description) VALUES
('Electronics', 'Devices and gadgets'),
('Clothing', 'Apparel and accessories');

INSERT INTO products (id, name, price, img, manufaction, category_id, forState, color) VALUES
('P007', 'Smartphone', 40.4, 'data:image/jpeg;base64,...', 1, 1, 'unisex', 'black'),
('P006', 'T-shirt', 20.0, 'data:image/jpeg;base64,...', 2, 2, 'man', 'white');

INSERT INTO product_images (product_id, photo_description) VALUES
('P007', 'Front view of the smartphone'),
('P006', 'Front view of the T-shirt');
select * from product_images;
INSERT INTO product_image_items (product_image_id, img) VALUES
(3, 'data:image/jpeg;base64,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'),
(3, 'data:image/jpeg;base64,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');

INSERT INTO product_items ( product_id, size, quantity) VALUES
( 'P007', 'One Size', 50),
( 'P006', 'M', 10),
( 'P006', 'S', 20),
( 'P006', 'XL', 30);
select * from product_items;
INSERT INTO clients (first_name, last_name, phoneNumber, email, hashed_password) VALUES
('John', 'Doe', '1112223333', 'john.doe@example.com', 'hashed_password_1'),
('Jane', 'Smith', '4445556666', 'jane.smith@example.com', 'hashed_password_2');

INSERT INTO orders (client_id, status, description_delivery, total_amount) VALUES
(1, 'confirm', 'Deliver to address 1', 719.98),
(2, 'wait', 'Deliver to address 2', 19.99);

INSERT INTO order_items (order_id, product_item_id, quantity, price) VALUES
(1, 5, 1, 40.4),
(1, 6, 2, 20.0),
(2, 7, 1, 20.0);

INSERT INTO admins (username, email, hashed_password) VALUES
('admin1', 'admin1@example.com', 'admin_hashed_password_1'),
('admin2', 'admin2@example.com', 'admin_hashed_password_2');

INSERT INTO seller_admin (username, email, hashed_password, company_id) VALUES
('selleradmin1', 'selleradmin1@example.com', 'selleradmin_hashed_password_1', 1),
('selleradmin2', 'selleradmin2@example.com', 'selleradmin_hashed_password_2', 2);

-- Call the stored procedures
CALL GetProductImagesByProductId('P007');
