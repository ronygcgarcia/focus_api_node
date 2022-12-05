import Security from '../utils/Security';
import ForbiddenException from '../../handlers/ForbiddenException';
import { Request, Response, NextFunction } from 'express';

const role = (roleName: string) => async (req: Request, res: Response, next: NextFunction) => {
  const valid = await Security.isGranted(req.usuario.id, roleName);
  if (valid) next();
  else throw new ForbiddenException();
};

export default role;
