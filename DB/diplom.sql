create DATABASE diplom;
USE diplom;
CREATE TABLE buyer(
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
    img varchar(255) not null,
    manufaction INT NOT NULL,
    category_id INT,
    forState ENUM('man', 'women', 'unisex'),
    color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY ( manufaction) REFERENCES buyer(id)
);

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
    price DECIMAL(10, 2) NOT NULL,
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
select * from clients;
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
CREATE TABLE buyers_admin(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    company_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY ( company_id) REFERENCES buyer(id)
);

INSERT INTO buyer (id, name_company, email, telephone, created_at) 
VALUES 
(1, 'Company A', 'contact@companya.com', '1234567890', '2024-06-02 17:00:00'),
(2, 'Company B', 'contact@companyb.com', '0987654321', '2024-06-02 17:05:00');

INSERT INTO categories (id, name, description) 
VALUES 
(1, 'Clothing', 'Clothing items for men and women'),
(2, 'Footwear', 'Shoes and other footwear'),
(3, 'Accessories', 'Fashion accessories');

INSERT INTO products (id, name, img, manufaction, category_id, forState, color, created_at) 
VALUES 
('6', 'Men\'s T-Shirt', 'https://ih1.redbubble.net/image.4646407321.9310/ssrco,classic_tee,mens,fafafa:ca443f4786,front_alt,square_product,600x600.jpg', 1, 1, 'man', 'blue', '2024-06-02 17:00:00'),
('7', 'Women\'s Dress', 'https://ih1.redbubble.net/image.4646407321.9310/ssrco,classic_tee,mens,fafafa:ca443f4786,front_alt,square_product,600x600.jpg', 2, 1, 'women', 'red', '2024-06-02 17:05:00'),
('8', 'Unisex Hoodie', 'https://ih1.redbubble.net/image.4646407321.9310/ssrco,classic_tee,mens,fafafa:ca443f4786,front_alt,square_product,600x600.jpg', 1, 3, 'unisex', 'black', '2024-06-02 17:10:00'),
('9', 'Men\'s Jeans', 'https://ih1.redbubble.net/image.4646407321.9310/ssrco,classic_tee,mens,fafafa:ca443f4786,front_alt,square_product,600x600.jpg', 1, 1, 'man', 'blue', '2024-06-02 17:15:00'),
('10', 'Women\'s Skirt', 'https://ih1.redbubble.net/image.4646407321.9310/ssrco,classic_tee,mens,fafafa:ca443f4786,front_alt,square_product,600x600.jpg', 2, 1, 'women', 'green', '2024-06-02 17:20:00');

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
        JOIN buyer b ON p.manufaction = b.id
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

CALL GetProductDetails('product_id_here');


