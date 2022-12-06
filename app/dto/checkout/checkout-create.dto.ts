import { Expose } from 'class-transformer';
import {
  IsNumber,
} from 'class-validator';
    
export class CheckoutCreateDto {
    
  @IsNumber()
  @Expose()
    book_id: number;
}