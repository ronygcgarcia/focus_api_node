import BaseError from './BaseError';
import HttpCode from '../configs/httpCode';

export default class BadRequestException extends BaseError {
  constructor(
    description = 'An error has ocurred',
  ) {
    super('BAD_REQUEST', HttpCode.HTTP_INTERNAL_SERVER_ERROR, description);
  }
}
