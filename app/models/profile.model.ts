import { Table, Model, DataType, Column, PrimaryKey, CreatedAt, UpdatedAt, Unique, BelongsToMany, BelongsTo, AutoIncrement } from 'sequelize-typescript';
import { User, ProfileUser, Permission, ProfilePermission } from '.';

@Table({
  timestamps: true,
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

  @BelongsToMany(() => Permission, () => ProfilePermission, 'profile_id', 'permission_id')
    permissions: Permission[];

  @CreatedAt
    created_at: Date;

  @UpdatedAt
    updated_at: Date;
}