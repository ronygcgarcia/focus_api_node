import HttpCode from '../../configs/httpCode';
import { Request, Response } from 'express';
import 'reflect-metadata';
import { Inject, Service } from 'typedi';
import RouteService from '../services/route.service';

@Service()
class RouteController {
  routeService: RouteService;

  constructor(
  @Inject()
    routeService: RouteService,
  ) {
    this.routeService = routeService;    
  }

  async index(req: Request, res: Response) {
    const routes = await this.routeService.getRoutes(req.user.id);
     
    return res.status(HttpCode.HTTP_OK).json(routes);
  }
}

export default RouteController;


