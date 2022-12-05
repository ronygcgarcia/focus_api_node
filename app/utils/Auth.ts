import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import moment from 'moment-timezone';
import Cache from '../nucleo/Cache';
import IRole from '../interfaces/IRole';
import IUsuario from '../interfaces/IUsuario';
import Base = moment.unitOfTime.Base;

export default class Auth {
  static async createToken(PAYLOAD: { 
    id_usuario?: number, 
    email?: string, 
    roles?: Array<IRole>, 
    user?: IUsuario  }, 
  secretKey: string, 
  expire: string = process.env.JWT_EXPIRATION_TIME as string) {
    return new Promise((resolve, reject) => {
      jwt.sign(PAYLOAD, secretKey, {
        expiresIn: expire,
      }, (err, token) => {
        if (err) reject(err);
        else resolve(token);
      });
    });
  }

  static async refresh_token(user: IUsuario) {
    const REFRESH_TOKEN = uuid();
    const valid = moment().add(process.env.REFRESH_EXPIRATION_TIME, process.env.REFRESH_EXPIRATION_TYPE as Base).tz('America/El_Salvador');
    await Cache.hSet(REFRESH_TOKEN, {
      refresh_token: REFRESH_TOKEN,
      id_usuario: user?.id,
      valid: valid.format(),
    }, moment.duration(valid.diff(moment())).asSeconds());
    const result = await Cache.hGet(REFRESH_TOKEN, 'refresh_token');
    return result;
  }
}
