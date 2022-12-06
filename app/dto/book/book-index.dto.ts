import { Expose, Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
} from 'class-validator';
import { Op } from 'sequelize';
    
export class BookIndexDto {
    
  @IsString()
  @Expose()
  @Transform(({ value }) => ({
    [Op.iLike]: value ? `%${value}%` : '%%',
  }))
    title?: {
    [Op.iLike]: string
  };
    
  @IsString()
  @Expose()
  @Transform(({ value }) => ({
    [Op.iLike]: value ? `%${value}%` : '%%',
  }))
    author?: {
    [Op.iLike]: string
  };

  @IsNumber()
    genre_id?: number;
}