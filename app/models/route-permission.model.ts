import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Permission, Route } from '.';

@Table({
  timestamps: false,
  tableName: 'routes_permissions',
})
export default class RoutePermission extends Model {
  @ForeignKey(() => Route)
  @Column
    route_id: number;

  @ForeignKey(() => Permission)
  @Column
    permission_id: number;
}