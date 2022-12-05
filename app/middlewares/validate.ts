import HttpCode from '../../configs/httpCode';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

function validation(schema: Joi.ObjectSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      convert: false,
    });
    if (error) {
      const fields = error.details.map((detail) => ({ message: detail.message, field: detail?.path[0] }));
      return res.status(HttpCode.HTTP_BAD_REQUEST).json({
        message: 'Wrong body request',
        fields,
      });
    }
    next();
  };
}

export default validation;
