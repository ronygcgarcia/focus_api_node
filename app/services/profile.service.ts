import 'reflect-metadata';
import { Profile } from '../models';
import { Repository } from 'sequelize-typescript';
import { Service } from 'typedi';
import InjectRepository from '../decorators/inject-repository';
import BadRequestException from '../../handlers/InternalServerException';
import NotFoundException from '../../handlers/NotFoundException';

@Service()
export default class PerfilService  {
  @InjectRepository(Profile)
  private perfilRepository: Repository<Profile>;


  async getPerfil(idProfile: number) {
    if (isNaN(idProfile)) throw new BadRequestException('El parametro debe de ser un id valido');
    const profile = await this.perfilRepository.findByPk(idProfile);
    if (!profile) throw new NotFoundException('No existe un profile con ese id');
    return profile;
  }
}
