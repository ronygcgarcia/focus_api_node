import { Table, Model, ForeignKey, Column, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import { Genre } from '.';

@Table({
  timestamps: false,
  tableName: 'books',
})
export default class Book extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @Column({
    type: DataType.STRING,
  })
    title: string;

  @Column({
    type: DataType.STRING,
  })
    description: string;

  @Column({
    type: DataType.STRING,
  })
    link_image: string;

  @Column({
    type: DataType.STRING,
  })
    author: string;

  @ForeignKey(() => Genre)
  @Column
    genre_id: number;

  @Column({
    type: DataType.DATE,
  })
    publish_year: Date;

  @Column({
    type: DataType.INTEGER,
  })
    stock: number;
}