import { Router } from 'express';
import orderRoute from './order';
import productRoute from './product';

const router = Router();

router.use('/product', productRoute);
router.use('/order', orderRoute);

export default router;
