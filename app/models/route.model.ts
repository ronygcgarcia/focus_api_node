import { Table, Model, DataType, Column, PrimaryKey, CreatedAt, UpdatedAt, Unique, BelongsToMany, BelongsTo, AutoIncrement, HasMany, HasOne, ForeignKey } from 'sequelize-typescript';
import { Permission, RoutePermission } from '.';

@Table({
  timestamps: true,
  tableName: 'routes',
})
export default class Route extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
    id: number;

  @Column({
    type: DataType.STRING,
    comment: 'Path name',
  })
    name: string;

  @Column({
    type: DataType.STRING,
    comment: 'Frontend path',
  })
    uri: string;

  @Column({
    type: DataType.STRING,
    comment: 'Name showing on the frontend',
  })
    uri_name: string;

  @Column({
    type: DataType.STRING,
    comment: 'Icon showing on the frontend',
  })
    icon: string;

  @Column({
    type: DataType.INTEGER,
    comment: 'Order of path list',
  })
    order: string;

  @BelongsToMany(() => Permission, () => RoutePermission, 'route_id', 'permission_id')
    roles: Permission[];

  @CreatedAt
    created_at: Date;

  @UpdatedAt
    updated_at: Date;
}