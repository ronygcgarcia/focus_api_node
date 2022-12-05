import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

const Call = (controllerName: any, methodKey: string) => {
  const Controller: object = Container.get(controllerName);
  const fn: Function = Controller[methodKey as keyof typeof Controller];
  if (!fn) throw Error(`${methodKey} is not defined in ${Controller.constructor.name}`);
  return (req: Request, res: Response, next: NextFunction) => fn.call(Controller, req, res).catch((e: Error) => next(e));
};

export default Call;
