import 'reflect-metadata';
import { Permission, Profile, Route, User } from '../models';
import { Repository } from 'sequelize-typescript';
import { Service } from 'typedi';
import InjectRepository from '../decorators/inject-repository';
import BadRequestException from '../../handlers/InternalServerException';

@Service()
export default class RouteService  {
  @InjectRepository(Route)
  private routesRepository: Repository<Route>;

  @InjectRepository(Profile)
  private profileRepository: Repository<Profile>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  async getRoutes(idUsuario: number) {
    if (isNaN(idUsuario)) throw new BadRequestException('Params is not valid');
    const user = await this.userRepository.findByPk(idUsuario, {
      include: [this.profileRepository],
    });

    const profiles  = await user?.profiles.map((profileObj: Profile) => profileObj.id);

    const routes = await this.routesRepository.findAll({
      include: {
        required: true,
        model: this.permissionRepository,
        include: [
          {
            required: true,
            model: this.profileRepository,
            through: {
              where: {
                profile_id: profiles,
              },
            },
          },
        ],
      },
    });
    return routes;
  }
}
