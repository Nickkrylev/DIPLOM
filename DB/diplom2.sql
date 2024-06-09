create DATABASE diplom;
USE diplom;
CREATE TABLE seller(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_company VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone varchar(20) UNIQUE NOT NULL,
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
    img text not null,
    manufaction INT NOT NULL,
    description text,
    category_id INT,
    forState ENUM('man', 'women', 'unisex'),
    color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY ( manufaction) REFERENCES seller(id)
);
select * from categories;
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50),
    photo_description TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_image_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_image_id INT,
    img VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_image_id) REFERENCES product_images(id)
);


CREATE TABLE product_items (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    product_id VARCHAR(50) NOT NULL,
   
    size VARCHAR(15),
    quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
select * from  product_items;
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(70) NOT NULL,
    phoneNumber VARCHAR(12) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from product_items;
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('cancel', 'confirm', 'wait', 'wait delivery'),
    description_delivery TEXT,
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_item_id VARCHAR(50),
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_item_id) REFERENCES product_items(id)
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE seller_admin(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    company_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY ( company_id) REFERENCES seller(id)
);


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
        price,
        size,
        quantity,
        created_at
    FROM 
        product_items
    WHERE 
        product_id = product_id;
END //

DELIMITER ;

CALL GetProductImagesByProductId('P001')
DELIMITER //

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

DELIMITER ;

CALL GetProductImagesByProductId('P001');

DELIMITER //

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

-- Inserting sample data

-- Insert sample data into seller
INSERT INTO seller (name_company, email, telephone) VALUES
('Company A', 'emailA@company.com', '1234567890'),
('Company B', 'emailB@company.com', '0987654321');

-- Insert sample data into categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Devices and gadgets'),
('Clothing', 'Apparel and accessories');

-- Insert sample data into products
INSERT INTO products (id, name, price,img, manufaction, category_id, forState, color) VALUES
('P001', 'Smartphone', 40.4,'data:image/jpeg;base64,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', 1, 1, 'unisex', 'black'),
('P002', 'T-shirt',40.4, 'data:image/jpeg;base64,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', 2, 2, 'man', 'white');
INSERT INTO products (id, name, price,img, manufaction, category_id, forState, color) VALUES
('P001', 'Smartphone', 40.4,'data:image/jpeg;base64,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', 1, 1, 'unisex', 'black'), 
-- Insert sample data into product_images
INSERT INTO product_images (product_id, photo_description) VALUES
('P001', 'Front view of the smartphone'),
('P002', 'Front view of the T-shirt');

-- Insert sample data into product_image_items
INSERT INTO product_image_items (product_image_id, img) VALUES
(1, 'smartphone_front.jpg'),
(2, 'tshirt_front.jpg');

-- Insert sample data into product_items
INSERT INTO product_items (id, product_id,size, quantity) VALUES
('PI004', 'P001',  'One Size', 50),
('PI003', 'P002',  'M', 1),
('PI005', 'P002',  'S', 2),
('PI006', 'P002',  'XL', 0);

-- Insert sample data into clients
INSERT INTO clients (first_name, last_name, phoneNumber, email, hashed_password) VALUES
('John', 'Doe', '1112223333', 'john.doe@example.com', 'hashed_password_1'),
('Jane', 'Smith', '4445556666', 'jane.smith@example.com', 'hashed_password_2');

-- Insert sample data into orders
INSERT INTO orders (client_id, status, description_delivery, total_amount) VALUES
(1, 'confirm', 'Deliver to address 1', 719.98),
(2, 'wait', 'Deliver to address 2', 19.99);

-- Insert sample data into order_items
INSERT INTO order_items (order_id, product_item_id, quantity, price) VALUES
(1, 'PI001', 1, 699.99),
(1, 'PI002', 1, 19.99),
(2, 'PI002', 1, 19.99);

-- Insert sample data into admins
INSERT INTO admins (username, email, hashed_password) VALUES
('admin1', 'admin1@example.com', 'admin_hashed_password_1'),
('admin2', 'admin2@example.com', 'admin_hashed_password_2');

-- Insert sample data into seller_admin
INSERT INTO seller_admin (username, email, hashed_password, company_id) VALUES
('selleradmin1', 'selleradmin1@example.com', 'selleradmin_hashed_password_1', 1),
('selleradmin2', 'selleradmin2@example.com', 'selleradmin_hashed_password_2', 2);





-- Insert sample data into seller
INSERT INTO seller (name_company, email, telephone) VALUES
('Company A', 'emailA@company.com', '1234567890'),
('Company B', 'emailB@company.com', '0987654321');

-- Insert sample data into categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Devices and gadgets'),
('Clothing', 'Apparel and accessories');

-- Insert sample data into products
INSERT INTO products (id, name, price, img, manufaction, category_id, forState, color) VALUES
('P007', 'Smartphone', 40.4, 'data:image/jpeg;base64,...', 1, 1, 'unisex', 'black'),
('P006', 'T-shirt', 20.0, 'data:image/jpeg;base64,...', 2, 2, 'man', 'white');
SELECT * FROM seller WHERE id = 4;

-- Insert sample data into product_images
INSERT INTO product_images (product_id, photo_description) VALUES
('P001', 'Front view of the smartphone'),
('P002', 'Front view of the T-shirt');

-- Insert sample data into product_image_items
INSERT INTO product_image_items (product_image_id, img) VALUES
(1, 'smartphone_front.jpg'),
(2, 'tshirt_front.jpg');

-- Insert sample data into product_items
INSERT INTO product_items (id, product_id, size, quantity) VALUES
('PI004', 'P001', 'One Size', 50),
('PI003', 'P002', 'M', 10),
('PI005', 'P002', 'S', 20),
('PI006', 'P002', 'XL', 30);

-- Insert sample data into clients
INSERT INTO clients (first_name, last_name, phoneNumber, email, hashed_password) VALUES
('John', 'Doe', '1112223333', 'john.doe@example.com', 'hashed_password_1'),
('Jane', 'Smith', '4445556666', 'jane.smith@example.com', 'hashed_password_2');

-- Insert sample data into orders
INSERT INTO orders (client_id, status, description_delivery, total_amount) VALUES
(1, 'confirm', 'Deliver to address 1', 719.98),
(2, 'wait', 'Deliver to address 2', 19.99);

-- Insert sample data into order_items
INSERT INTO order_items (order_id, product_item_id, quantity, price) VALUES
(1, 'PI004', 1, 40.4),
(1, 'PI005', 2, 20.0),
(2, 'PI006', 1, 20.0);

-- Insert sample data into admins
INSERT INTO admins (username, email, hashed_password) VALUES
('admin1', 'admin1@example.com', 'admin_hashed_password_1'),
('admin2', 'admin2@example.com', 'admin_hashed_password_2');

-- Insert sample data into seller_admin
INSERT INTO seller_admin (username, email, hashed_password, company_id) VALUES
('selleradmin1', 'selleradmin1@example.com', 'selleradmin_hashed_password_1', 1),
('selleradmin2', 'selleradmin2@example.com', 'selleradmin_hashed_password_2', 2);
