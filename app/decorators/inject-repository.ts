import 'reflect-metadata';
import Database from '../nucleo/Database';

export default function InjectRepository(model: any) {
  return function (target: any, key: string) {
    const conn = new Database();
    const repo = conn.getRepository(model);
    Object.defineProperty(target, key, {
      value: repo,
      enumerable: true,
      configurable: true,
    });
  };
}
