import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { Repository } from 'sequelize-typescript';
import { Inject, Service } from 'typedi';
import InjectRepository from '../decorators/inject-repository';
import { CheckoutCreateDto } from '../dto/checkout/checkout-create.dto';
import { Book, Checkout, User } from '../models';
import PermissionService from './permission.service';
import moment from 'moment';
import BadRequestException from '../../handlers/InternalServerException';
import { CheckoutReturnDto } from '../dto/checkout/checkout-return.dto';
import NotFoundException from '../../handlers/NotFoundException';

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
 
  async index(userId: number | undefined) {
    
    let where;
    if ( userId ) where = { user_id: userId };
    
    const checkouts = await this.checkoutRepository.findAll({
      where,
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

  async create(userId: number, checkout: CheckoutCreateDto) {
    const book = await this.bookRepository.findByPk(checkout.book_id);
    if (book && book.stock < 1) throw new BadRequestException(`You can't add the book: ${book.title} because is out of stock`);
    const checkoutObj = await this.checkoutRepository.create({ 
      ...checkout,
      checkout_date: moment(),
      status: false,
      user_id: userId,
    });
    await this.bookRepository.update({
      stock: Number(book?.stock) - 1,
    }, {
      where: {
        id: checkout.book_id,
      },
    });

    return checkoutObj;
  }

  async setReturned(checkoutId: number, checkout :CheckoutReturnDto) {
    const checkoutObj = await this.checkoutRepository.findByPk(checkoutId);
    if (!checkoutObj) throw new NotFoundException('Checkout not found');
    await this.bookRepository.increment('stock', {
      where: {
        id: checkoutObj?.book_id,
      },
    });
    await checkoutObj?.update({
      status: checkout.status,
    });

    return true;
  }
}
