import { Router } from 'express';
import CheckoutController from '../../app/controllers/checkout.controller';
import Call from '../../app/utils/Call';

const router = Router();
router.get('/', Call(CheckoutController, 'index'));

export default router;
