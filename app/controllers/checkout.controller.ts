import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import HttpCode from '../../configs/httpCode';
import CheckoutService from '../services/checkout.service';
import PermissionService from '../services/permission.service';


@Service()
export default class CheckoutController {
  checkoutService: CheckoutService;

  permissionService: PermissionService;

  constructor(
  @Inject()
    checkoutService: CheckoutService,
    permissionService: PermissionService,
  ) {
    this.checkoutService = checkoutService;   
    this.permissionService = permissionService; 
  }

  async index(req: Request, res: Response) {
    const { user_id: userId }  = req.query;
    
    const isGranted = await this.permissionService.checkUserPermission(req.user.id, 'ROLE_CHECKOUT_USER');
    let filter;

    if (!isGranted) filter = req.user.id;
    if (isGranted && userId) filter = userId;

    const checkouts = await this.checkoutService.index(Number(filter));
    return res.status(HttpCode.HTTP_OK).json(checkouts);
  }

  async store(req: Request, res: Response) {
    await this.checkoutService.create(req.user.id, req.body);

    return res.status(HttpCode.HTTP_CREATED).json({
      message: 'Books checkout successfully',
    });
  }

  async setReturn(req: Request, res: Response) {
    await this.checkoutService.setReturned(Number(req.params.checkout_id), req.body);

    return res.status(HttpCode.HTTP_OK).json({
      message: 'Update successfully',
    });
  }
}