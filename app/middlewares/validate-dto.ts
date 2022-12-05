import  { Response, Request, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import HttpCode from '../../configs/httpCode';

const validation = (classDto: any) => async (req: Request, res: Response, next: NextFunction) => {
  const output = plainToInstance(classDto, req.body);
  const errors = await validate(output, { skipMissingProperties: true });
  if (errors.length > 0) {
    const errorTexts = errors.map((error) => error.constraints);
    res.status(HttpCode.HTTP_BAD_REQUEST).send(errorTexts);
    return;
  } 
  
  next();
};

export default validation;