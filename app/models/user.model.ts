import { Table, Model, DataType, Column, PrimaryKey, CreatedAt, UpdatedAt, Unique, BelongsToMany, AutoIncrement } from 'sequelize-typescript';
import { Profile, ProfileUser } from '.';

@Table({
  timestamps: true,
  tableName: 'users',
})
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @Column({
    type: DataType.STRING,
    comment: 'User first name',
  })
    first_name: string;

  @Column({
    type: DataType.STRING,
    comment: 'User last name',
  })
    last_name: string;
    
  @Unique
  @Column({
    type: DataType.STRING,
    comment: 'User email',
  })
    email: string;

  @Column({
    type: DataType.STRING,
    comment: 'User password',
  })
    password: string;

  @BelongsToMany(() => Profile, () => ProfileUser, 'user_id', 'profile_id')
    profiles: Profile[];

  @CreatedAt
    created_at: Date;

  @UpdatedAt
    updated_at: Date;
}