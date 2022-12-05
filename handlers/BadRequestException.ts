import BaseError from './BaseError';
import HttpCode from '../configs/httpCode';

export default class BadRequestException extends BaseError {
  constructor(
    description = 'Valores no válidos',
  ) {
    super('BAD_REQUEST', HttpCode.HTTP_BAD_REQUEST, description);
  }
}
