import { Router } from 'express';
import bodyParser from 'body-parser';
import sellerRouter from './sellerRouter';
import categoryRouter from './categoryRouter';
import productRouter from './productRouter';
import productImageRouter from './productImageRouter';
import productImageItemRouter from './productImageItemRouter';
import productItemRouter from './productItemRouter';
import clientRouter from './clientRouter';
import orderRouter from './orderRouter';
import orderItemRouter from './orderItemRouter';
import adminRouter from './adminRouter';
import sellerAdminRouter from './selelrAdminRouter';
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