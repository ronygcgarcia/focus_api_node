import { NextFunction, Request, Response } from 'express';
import HttpCode from '../configs/httpCode';
import BaseError from './BaseError';

export default class Handler {
  static responseContent(err: {
    statusCode: number, 
    description: string,
    name: string,
    errors: any[]
  }) {
    if (err.statusCode) return { message: err.description };

    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      return err.errors.map((row) => ({
        field: row.path,
        message: row.message,
      }));
    }

    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      return {
        message: 'Unauthorized',
      };
    }

    return {
      message: 'Has been ocurred an error',
      stack: err.description,
    };
  }

  static isOPerationalError(error: BaseError) {
    return error.isOperational;
  }

  static handle(err: any, req: Request, res: Response, next: NextFunction) {
    let message = 'Has been ocurred an error';
    if (err.statusCode) message = err.description;
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') return res.status(HttpCode.HTTP_UNAUTHORIZED).json({ message: 'Unauthorized', stack:  err.stack });
    const response: {
      message: string,
      stack?: string
    } = {
      message,
    };
    response.stack = err.stack;
    return res.status(err.statusCode || HttpCode.HTTP_INTERNAL_SERVER_ERROR).json(response);
  }
}
