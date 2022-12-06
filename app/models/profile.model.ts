import { Table, Model, DataType, Column, PrimaryKey, CreatedAt, UpdatedAt, Unique, BelongsToMany, BelongsTo, AutoIncrement } from 'sequelize-typescript';
import { User, ProfileUser, Permission, PermissionProfile } from '.';

@Table({
  timestamps: false,
  tableName: 'profiles',
})
export default class Profile extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @Column({
    type: DataType.STRING,
    comment: 'Profile name',
  })
    name: string;

  @BelongsToMany(() => User, () => ProfileUser, 'profile_id', 'user_id')
    users: User[];

  @BelongsToMany(() => Permission, () => PermissionProfile, 'profile_id', 'permission_id')
    permissions: Permission[];
}