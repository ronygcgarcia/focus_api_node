import jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

export default class Auth {
  static async createToken(PAYLOAD: {
    user?: IUser  
  }, 
  secretKey: string, 
  expire: string = process.env.JWT_EXPIRATION_TIME || '60m') {
    return new Promise((resolve, reject) => {
      jwt.sign(PAYLOAD, secretKey, {
        expiresIn: expire,
      }, (err, token) => {
        if (err) reject(err);
        else resolve(token);
      });
    });
  }
}
