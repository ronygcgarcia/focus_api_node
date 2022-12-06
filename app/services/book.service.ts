import { plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { Repository } from 'sequelize-typescript';
import { Service } from 'typedi';
import InjectRepository from '../decorators/inject-repository';
import { BookCreateDto } from '../dto/book/book-create.dto';
import { BookIndexDto } from '../dto/book/book-index.dto';
import { Book } from '../models';

@Service()
export default class BookService  {
  @InjectRepository(Book)
  private bookRepository: Repository<Book>;

  async index(query: BookIndexDto) {
    const filter: BookIndexDto = plainToClass(BookIndexDto, query);
    const books = await this.bookRepository.findAll({
      where: {
        ...filter,
      },
    });

    return books;
  }

  async store(book: BookCreateDto) {
    const bookObj = await this.bookRepository.create({ ...book });

    return bookObj;
  }
}
