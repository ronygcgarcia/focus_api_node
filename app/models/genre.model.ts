import { Table, Model, Column, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'genres',
})
export default class Genre extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;
  
  @Column({
    type: DataType.DATE,
  })
    name: string;
}