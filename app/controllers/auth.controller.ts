import { Request, Response } from 'express';
import HttpCode from '../../configs/httpCode';
import { Inject, Service } from 'typedi';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../models';

@Service()
export default class AuthController {
  userService: UserService;

  authService: AuthService;

  constructor(
  @Inject()
    userService: UserService,
    authService: AuthService,
  ) {
    this.userService = userService;    
    this.authService = authService;
  }
  
  async login(req: Request, res: Response) {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await this.userService.getUserByEmail(email) as User;

    const token = await this.authService.login(user, password);

    return res.status(HttpCode.HTTP_OK).json(token);
  }

  async signup(req: Request, res: Response) {
    const createUserDto: CreateUserDto = req.body;
    await this.userService.createUser(createUserDto);

    return res.status(HttpCode.HTTP_CREATED).json({
      message: 'User created',
    });
  }
}