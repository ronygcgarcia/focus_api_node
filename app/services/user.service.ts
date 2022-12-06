import 'reflect-metadata';
import { Permission, Profile, User } from '../models';
import { Repository } from 'sequelize-typescript';
import ProfileService from './profile.service';
import { Inject, Service } from 'typedi';
import InjectRepository from '../decorators/inject-repository';
import { CreateUserDto } from '../dto/auth/create-user.dto';
import Database from '../nucleo/Database';
import bcrypt from 'bcryptjs';
import UnprocessableEntityException from '../../handlers/UnprocessableEntityException';

@Service()
export default class UserService  {

  db: Database;

  constructor(
    @Inject() 
    private readonly profileService: ProfileService,
  ) {
    this.db = new Database();
  }
  
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Profile)
  private profileRepository: Repository<Profile>;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  async getUser(idUser: number) {
    const user = this.userRepository.findOne({
      where: {
        id:idUser,
      },
      include: {
        model: this.profileRepository,
      },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, profiles, first_name: firstName, last_name: lastName } = createUserDto;
    const connection = this.db;
    const transaction = await connection.transaction();  

    const salt = bcrypt.genSaltSync();
    const passwordCrypt = bcrypt.hashSync(password, salt);

    let userProfiles;
    
    const emailExist = await this.getUserByEmail(email);
    if (emailExist) throw new UnprocessableEntityException('This email has been taken');
    try {
      
      if (profiles) {
        userProfiles = await Promise.all(profiles.map((perfil) => this.profileService.getPerfil(perfil)));
      }

      const user = await this.userRepository.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password: passwordCrypt,
      }, { transaction });
      
      if (profiles) await user.$add('profiles', profiles, { transaction });

      await transaction.commit();

      return ({
        id: user.id,
        email: user.email,
        profiles: userProfiles,
      });
    } catch (e) {
      await transaction.rollback();
      throw e;
    }

  }

  async getUsers() {
    const users = await this.userRepository.findAll({
      include: {
        model: this.profileRepository,
        include: [
          {
            model: this.permissionRepository,
          },
        ],
      },
    });

    return users;
  }
}
