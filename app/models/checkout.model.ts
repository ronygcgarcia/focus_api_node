import { Table, Model, ForeignKey, Column, PrimaryKey, AutoIncrement, DataType, CreatedAt, UpdatedAt, BelongsTo } from 'sequelize-typescript';
import { User, Book } from '.';

@Table({
  timestamps: true,
  tableName: 'checkouts',
})
export default class Checkout extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @Column({
    type: DataType.DATE,
  })
    checkout_date: Date;

  @Column({
    type: DataType.BOOLEAN,
  })
    status: boolean;

  @ForeignKey(() => User)
  @Column
    user_id: number;

  @ForeignKey(() => Book)
  @Column
    book_id: number;

  @CreatedAt
    created_at: Date;

  @UpdatedAt
    updated_at: Date;

  @BelongsTo(()=> Book, 'book_id')
    book: Book;
  
  @BelongsTo(()=> User, 'user_id')
    user: User;
}