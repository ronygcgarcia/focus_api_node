import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import HttpCode from '../../configs/httpCode';
import BookService from '../services/book.service';

@Service()
class BookController {
  private bookService: BookService;

  constructor(
  @Inject()
    bookService: BookService,
  ) {
    this.bookService = bookService;    
  }

  async index(req: Request, res: Response) {
    const books = await this.bookService.index(req.query);
    
    return res.status(HttpCode.HTTP_OK).json(books);
  }

  async create(req: Request, res: Response) { 
    const book = await this.bookService.store(req.body);

    return res.status(HttpCode.HTTP_CREATED).json(book);
  }
}

export default BookController;