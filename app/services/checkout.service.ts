import { plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { Repository } from 'sequelize-typescript';
import { Inject, Service } from 'typedi';
import InjectRepository from '../decorators/inject-repository';
import { CheckoutIndexDto } from '../dto/checkout/checkout-index.dto';
import { Book, Checkout, User } from '../models';
import PermissionService from './permission.service';

@Service()
export default class CheckoutService  {
  @InjectRepository(Checkout)
  private checkoutRepository: Repository<Checkout>;

  @InjectRepository(Book)
  private bookRepository: Repository<Book>;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  permissionService: PermissionService;

  constructor(
  @Inject()
    permissionService: PermissionService,
  ) {
    this.permissionService = permissionService;    
  }
 
  async index(userId: number, query: CheckoutIndexDto) {
    const filter: CheckoutIndexDto = plainToClass(CheckoutIndexDto, query, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    
    const isGranted = await this.permissionService.checkUserPermission(userId, 'ROLE_CHECKOUT_USER');
    
    const checkouts = await this.checkoutRepository.findAll({
      where: isGranted ? { ...filter } : {},
      include: [
        {
          required: true,
          model: this.bookRepository,
        },
        {
          required: true,
          model: this.userRepository,
        },
      ],
    });
    return checkouts;
  }
}