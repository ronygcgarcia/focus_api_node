import { Router } from 'express';
import BookController from '../../app/controllers/book.controller';
import validation from '../../app/middlewares/validate';
import Call from '../../app/utils/Call';
import bookCreate from '../../app/schemas/book/book-create';

const router = Router();
router.get('/', Call(BookController, 'index'));
router.post('/', [validation(bookCreate)], Call(BookController, 'create'));
router.get('/:book_id', Call(BookController, 'show'));

export default router;
