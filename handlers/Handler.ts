import { NextFunction, Request, Response } from 'express';
import HttpCode from '../configs/httpCode';
import BaseError from './BaseError';

export default class Handler {
  static #responseContent(err: {
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

    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return {
        message:
          'No se puede eliminar uno o más registros debido a que tienen acciones asociadas al sistema',
      };
    }

    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      return {
        message: 'No autenticado',
      };
    }

    return {
      message: 'Ocurrio un error intentelo mas tarde',
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
    if (process.env.APP_DEBUG === 'true') response.stack = err.stack;
    return res.status(err.statusCode || HttpCode.HTTP_INTERNAL_SERVER_ERROR).json(response);
  }
}
