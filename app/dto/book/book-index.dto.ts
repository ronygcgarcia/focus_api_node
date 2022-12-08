import { Expose, Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
} from 'class-validator';
import { Op } from 'sequelize';
    
export class BookIndexDto {
    
  @IsString()
  @Expose()
  @Transform(({ value }) => {
    if (!value) return undefined;
    return {
      [Op.iLike]: `%${value?.split(' ').join('%')}%`,
    };
  })
    title?: {
    [Op.iLike]: string
  };
    
  @IsString()
  @Expose()
  @Transform(({ value }) => {
    if (!value) return undefined;
    return {
      [Op.iLike]: `%${value?.split(' ').join('%')}%`,
    };
  })
    author?: {
    [Op.iLike]: string
  };

  @IsNumber()
    genre_id?: number;
}