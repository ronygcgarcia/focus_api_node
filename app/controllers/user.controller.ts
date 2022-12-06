import HttpCode from '../../configs/httpCode';
import UserService from '../services/user.service';
import { Request, Response } from 'express';
import 'reflect-metadata';
import { Inject, Service } from 'typedi';
import { CreateUserDto } from '../dto/auth/create-user.dto';

@Service()
class UserController {
  userService: UserService;

  constructor(
  @Inject()
    userService: UserService,
  ) {
    this.userService = userService;    
  }

  async store(req: Request, res: Response) {
    const createUserDto: CreateUserDto = req.body;
    const user = await this.userService.createUser(createUserDto);
    return res.status(HttpCode.HTTP_CREATED).json(user);
  }

  async index(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    return res.status(HttpCode.HTTP_OK).json(users);
  }
}

export default UserController;


