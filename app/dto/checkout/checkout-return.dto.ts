import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
    
export class CheckoutReturnDto {
  @Expose()
  @IsNumber()
    status: number;
}