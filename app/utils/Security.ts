import { Container } from 'typedi';
import PermissionService from '../services/permission.service';

export default class Security {
  static async isGranted(idUser: number, permission: string) {
    const permissionService = Container.get(PermissionService);
    const userRole = await permissionService.checkUserPermission(idUser, permission);

    return !!userRole;
  }
}
