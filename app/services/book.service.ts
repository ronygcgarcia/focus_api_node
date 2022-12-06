import { plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { Repository } from 'sequelize-typescript';
import { Service } from 'typedi';
import NotFoundException from '../../handlers/NotFoundException';
import InjectRepository from '../decorators/inject-repository';
import { BookCreateDto } from '../dto/book/book-create.dto';
import { BookIndexDto } from '../dto/book/book-index.dto';
import { Book, Checkout, Genre } from '../models';

@Service()
export default class BookService  {
  @InjectRepository(Book)
  private bookRepository: Repository<Book>;

  @InjectRepository(Genre)
  private genreRepository: Repository<Genre>;

  @InjectRepository(Checkout)
  private checkoutRepository: Repository<Checkout>;

  async index(query: BookIndexDto) {
    const filter: BookIndexDto = plainToClass(BookIndexDto, query);
    const books = await this.bookRepository.findAll({
      where: {
        ...filter,
      },
      include: {
        model: this.genreRepository,
      },
    });

    return books;
  }

  async store(book: BookCreateDto) {
    const bookObj = await this.bookRepository.create({ ...book });

    return bookObj;
  }

  async show(bookId: number) {
    const book = await this.bookRepository.findByPk(bookId, {
      include: [
        {
          model: this.genreRepository,
        },
        {
          model: this.checkoutRepository,
        },
      ],
    });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }
}
