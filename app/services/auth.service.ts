import 'reflect-metadata';
import bcrypt from 'bcryptjs';
import { Profile, User } from '../models';
import { Repository } from 'sequelize-typescript';
import { Service } from 'typedi';
import InjectRepository from '../decorators/inject-repository';
import NoAuthException from '../../handlers/NoAuthException';
import Auth from '../utils/Auth';

@Service()
export default class AuthService  {
  @InjectRepository(Profile)
  private perfilRepository: Repository<Profile>;


  async login(user: User, password: string) {
    if (!user) throw new NoAuthException('Invalid credentials');

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) throw new NoAuthException('Invalid credentials');

    const userInfo = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };
    
    const token = {
      user: userInfo,
    };

    const secretKey: string = process.env.SECRET_KEY || 'clave_secreta';
    const response = {
      token: await Auth.createToken(token, secretKey),
    };

    return response;
  }
}
