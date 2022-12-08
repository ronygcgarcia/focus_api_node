import Security from '../utils/Security';
import ForbiddenException from '../../handlers/ForbiddenException';
import { Request, Response, NextFunction } from 'express';
import Handler from '../../handlers/Handler';

const permission = (permissionName: string) => async (req: Request, res: Response, next: NextFunction) => {
  const valid = await Security.isGranted(req.user.id, permissionName);
  console.log(valid);
  
  if (valid) next();
  else Handler.handle(new ForbiddenException(), req, res, next);
};

export default permission;
