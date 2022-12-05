import { Table, Model, DataType, Column, PrimaryKey, CreatedAt, UpdatedAt, BelongsTo, AutoIncrement, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import User from './user.model';
import ProfileUser from './profile-user.model';

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

  @BelongsToMany(() => User, () => ProfileUser, 'id_permission', 'id_user')
    users: User[];

  @CreatedAt
    created_at: Date;

  @UpdatedAt
    updated_at: Date;
}