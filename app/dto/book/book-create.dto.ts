import { Expose } from 'class-transformer';
import {
  IsString,
  IsNumber,
} from 'class-validator';
    
export class BookCreateDto {
    
  @IsString()
  @Expose()
    title: string;
    
  @IsString()
  @Expose()
    description: string;

  @IsString()
  @Expose()
    author: string;

  @IsString()
  @Expose()
    link_image: string;

  @IsNumber()
  @Expose()
    publish_year: number;

  @IsNumber()
    genre_id: number;

  @IsNumber()
    stock: number;
}