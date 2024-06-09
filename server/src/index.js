import dotenv from 'dotenv';
import app from './app.js'; // Note the .js extension
import { sequelize } from './db.js';
import Seller from './models/seller.js';
import Category from './models/category.js';
import Product from './models/product.js';
import ProductImage from './models/productImage.js';
import ProductImageItem from './models/productImageItem.js';
import ProductItem from './models/productItem.js';
import Client from './models/client.js';
import Order from './models/order.js';
import OrderItem from './models/orderItem.js';
import Admin from './models/admin.js';
import SellerAdmin from './models/sellerAdmin.js';

dotenv.config();

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync all models
        await Seller.sync();
        await Category.sync();
        await Product.sync();
        await ProductImage.sync();
        await ProductImageItem.sync();
        await ProductItem.sync();
        await Client.sync();
        await Order.sync();
        await OrderItem.sync();
        await Admin.sync();
        await SellerAdmin.sync();
        
        console.log('Database and tables have been created!');
    } catch (error) {
        console.error('Error creating the database and tables:', error);
    }
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
