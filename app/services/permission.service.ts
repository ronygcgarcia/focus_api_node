import 'reflect-metadata';
import { Permission, User } from '../models';
import { Repository } from 'sequelize-typescript';
import { Service } from 'typedi';
import InjectRepository from '../decorators/inject-repository';
import UnprocessableEntityException from '../../handlers/UnprocessableEntityException';
import BadRequestException from '../../handlers/InternalServerException';
import NotFoundException from '../../handlers/NotFoundException';

@Service()
export default class RoleService  {
  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async getPermissions() {
    const permissions = await this.permissionRepository.findAll().catch((e) => {
      console.log(e); 
    });

    return permissions;
  }

  async checkUserPermission(idUser: number, permission: string) {
    const permissionUser = await this.permissionRepository.findOne({
      include: {
        model: this.userRepository,
        where: {
          id: idUser,
        },
      },
      where: {
        name: permission,
      },
    });

    return permissionUser;
  }

  async getPermission(idPermission: number) {
    if (isNaN(idPermission)) throw new BadRequestException('Param is not valid');
    const permission = await this.permissionRepository.findByPk(idPermission);
    if (!permission) throw new NotFoundException('This permission does not exist');
    return permission;
  }

  async getPermissionByName(name: string) {
    const role = await this.permissionRepository.findOne({
      where: { nombre: name.trim().toUpperCase() },
    });
    return role;
  }

  async createPermission(role: string) {
    const permissionExist = await this.getPermissionByName(role);
    if (permissionExist) throw new UnprocessableEntityException('Permission already exist');
    const permissionCreate = await this.permissionRepository.create({
      name: role.trim().toUpperCase(),
    });
    return permissionCreate;
  }
}
