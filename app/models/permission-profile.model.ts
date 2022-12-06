import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import { Profile, Permission } from '.';

@Table({
  timestamps: false,
  tableName: 'permissions_profiles',
})
export default class PermissionProfile extends Model {
  @ForeignKey(() => Profile)
  @Column
    profile_id: number;

  @ForeignKey(() => Permission)
  @Column
    permission_id: number;
}