import BaseError from './BaseError';
import HttpCode from '../configs/httpCode';
import ErrorModel from '../app/nucleo/mongo/error';
import { Request, Response, NextFunction } from 'express';

type Error = {
  statusCode: number,
  message: string,
  stack: string
};

export default class Handler {
  static logError(req: Request, err: Error ) {
    if (req.usuario) {
      const Error = new ErrorModel({
        id_bitacora: req.bitacora ? req.bitacora.id : null,
        codigo: err.statusCode,
        mensaje: err.message,
        trace: err.stack,
        content: err,
      });
      Error.save();
    }
  }

  static logErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    Handler.logError(req, err);
    next(err);
  }

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
}
