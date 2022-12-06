import { Table, Model, DataType, Column, PrimaryKey, AutoIncrement, BelongsToMany } from 'sequelize-typescript';
import User from './user.model';
import Profile from './profile.model';
import PermissionProfile from './permission-profile.model';

@Table({
  timestamps: false,
  tableName: 'permissions',
})
export default class Permission extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @Column({
    type: DataType.STRING,
    comment: 'Role name',
  })
    name: string;

  @BelongsToMany(() => Profile, () => PermissionProfile, 'permission_id', 'profile_id')
    users: User[];
}