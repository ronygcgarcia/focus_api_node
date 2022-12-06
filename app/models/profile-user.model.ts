import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { User, Profile } from '.';

@Table({
  timestamps: false,
  tableName: 'profiles_users',
})
export default class ProfileUser extends Model {
  @ForeignKey(() => User)
  @Column
    user_id: number;

  @ForeignKey(() => Profile)
  @Column
    profile_id: number;
}