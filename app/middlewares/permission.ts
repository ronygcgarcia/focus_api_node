import Security from '../utils/Security';
import ForbiddenException from '../../handlers/ForbiddenException';
import { Request, Response, NextFunction } from 'express';

const role = (permissionName: string) => async (req: Request, res: Response, next: NextFunction) => {
  const valid = await Security.isGranted(req.user.id, permissionName);
  if (valid) next();
  else throw new ForbiddenException();
};

export default role;
