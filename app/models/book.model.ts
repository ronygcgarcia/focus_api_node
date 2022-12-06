import { Table, Model, ForeignKey, Column, PrimaryKey, AutoIncrement, DataType, HasMany, BelongsTo } from 'sequelize-typescript';
import { Genre, Checkout } from '.';

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
    type: DataType.INTEGER,
  })
    publish_year: number;

  @Column({
    type: DataType.INTEGER,
  })
    stock: number;

  @HasMany(() => Checkout, 'book_id')
    checkouts: Checkout[];
  
  @BelongsTo(() => Genre, 'genre_id')
    genre: Genre;
}