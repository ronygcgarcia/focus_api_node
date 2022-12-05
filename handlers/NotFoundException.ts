import BaseError from './BaseError';
import HttpCode from '../configs/httpCode';

export default class NotFoundException extends BaseError {
  constructor(description = 'Recurso no encontrado') {
    super('NOT_FOUND', HttpCode.HTTP_NOT_FOUND, description);
  }
}
