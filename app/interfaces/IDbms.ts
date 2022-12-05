import { Dialect } from 'sequelize';

export default interface IDbms {
  motor: Dialect,
  options: {
    db_host: string,
    db_port: number,
    db_name: string,
    db_username: string,
    db_password: string
  }
}

