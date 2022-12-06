import { Router } from 'express';
import CheckoutController from '../../app/controllers/checkout.controller';
import validation from '../../app/middlewares/validate';
import checkoutCreate from '../../app/schemas/checkout/checkout-create';
import checkoutReturn from '../../app/schemas/checkout/checkout-return';
import Call from '../../app/utils/Call';

const router = Router();
router.get('/', Call(CheckoutController, 'index'));
router.post('/', [validation(checkoutCreate)], Call(CheckoutController, 'store'));
router.put('/:checkout_id', [validation(checkoutReturn)], Call(CheckoutController, 'setReturn'));

export default router;
