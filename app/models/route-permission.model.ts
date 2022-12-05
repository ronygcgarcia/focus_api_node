import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Permission, Route } from '.';

@Table({
  timestamps: false,
  tableName: 'routes_permissions',
})
export default class RoutePermission extends Model {
  @ForeignKey(() => Route)
  @Column
    id_route: number;

  @ForeignKey(() => Permission)
  @Column
    id_permission: number;
}