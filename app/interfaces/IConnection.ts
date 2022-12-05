import { Dialect } from 'sequelize';
import dbms from './IDbms';
export default interface IConnections {
  connections: {
    postgres?: dbms,
    mysql?: dbms,
    sqlite?: dbms,
    mariadb?: dbms,
    mssql?: dbms,
    db2?: dbms,
    snowflake?: dbms,
    oracle?: dbms
  },
  default: Dialect
}