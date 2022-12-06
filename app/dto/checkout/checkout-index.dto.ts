import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
    
export class CheckoutIndexDto {
  @Expose()
  @IsNumber()
    user_id?: number;
}