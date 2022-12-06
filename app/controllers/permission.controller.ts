import HttpCode from '../../configs/httpCode';
import PermissionService from '../services/permission.service';
import { Request, Response } from 'express';
import 'reflect-metadata';
import { Inject, Service } from 'typedi';

@Service()
class PermissionController {
  permissionService: PermissionService;

  constructor(
  @Inject()
    permissionService: PermissionService,
  ) {
    this.permissionService = permissionService;    
  }

  async index(req: Request, res: Response) {
    const roles = await this.permissionService.getPermissions();

    return res.status(HttpCode.HTTP_OK).json(roles);
  }

  async showPermission(req: Request, res: Response) {
    const { id_role: idRole } = req.params;
    const rol = await this.permissionService.getPermission(Number(idRole));
    return res.status(HttpCode.HTTP_OK).json(rol);
  }

  async createPermission(req: Request, res: Response) {
    const { name } = req.body;
    const rol = await this.permissionService.createPermission(name);
    return res.status(HttpCode.HTTP_CREATED).json(rol);
  }
}

export default PermissionController;


