import { Router } from 'express';
import bodyParser from 'body-parser';
import sellerRouter from './sellerRouter.js';
import categoryRouter from './categoryRouter.js';
import productRouter from './productRouter.js';
import productImageRouter from './productImageRouter.js';
import productImageItemRouter from './productImageItemRouter.js';
import productItemRouter from './productItemRouter.js';
import clientRouter from './clientRouter.js';
import orderRouter from './orderRouter.js';
import orderItemRouter from './orderItemRouter.js';
import adminRouter from './adminRouter.js';
import sellerAdminRouter from './selelrAdminRouter.js';
const router = Router();


router.use(bodyParser.json());

// Use the routers
router.use('/sellers', sellerRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/product-images', productImageRouter);
router.use('/product-image-items', productImageItemRouter);
router.use('/product_items', productItemRouter);
router.use('/clients', clientRouter);
router.use('/orders', orderRouter);
router.use('/order-items', orderItemRouter);
router.use('/admin', adminRouter);
router.use('/seller-admins', sellerAdminRouter);




export default router;