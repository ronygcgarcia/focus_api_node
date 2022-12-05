import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import { Profile, Permission } from '.';

@Table({
  timestamps: false,
  tableName: 'permissions_profile',
})
export default class PermissionProfile extends Model {
  @ForeignKey(() => Profile)
  @Column
    id_profile: number;

  @ForeignKey(() => Permission)
  @Column
    id_permission: number;
}