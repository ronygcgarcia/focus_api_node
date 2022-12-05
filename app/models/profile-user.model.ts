import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { User, Profile } from '.';

@Table({
  timestamps: false,
  tableName: 'profiles_users',
})
export default class ProfileUser extends Model {
  @ForeignKey(() => User)
  @Column
    id_user: number;

  @ForeignKey(() => Profile)
  @Column
    id_profile: number;
}