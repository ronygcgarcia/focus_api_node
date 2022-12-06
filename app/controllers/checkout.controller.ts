import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import HttpCode from '../../configs/httpCode';
import CheckoutService from '../services/checkout.service';


@Service()
export default class CheckoutController {
  checkoutService: CheckoutService;

  constructor(
  @Inject()
    checkoutService: CheckoutService,
  ) {
    this.checkoutService = checkoutService;    
  }

  async index(req: Request, res: Response) {
    const checkouts = await this.checkoutService.index(req.user.id, req.query);
    return res.status(HttpCode.HTTP_OK).json(checkouts);
  }

  async store(req: Request, res: Response) {
    await this.checkoutService.create(req.user.id, req.body);

    return res.status(HttpCode.HTTP_CREATED).json({
      message: 'Books checkout successfully',
    });
  }
}