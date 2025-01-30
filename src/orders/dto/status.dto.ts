import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../enums';

export class StatusDto {
    @IsOptional()
    @IsEnum(OrderStatus,
        {
            message: `status must be a valid enum value. Valid options are ${Object.values(OrderStatus)}`,
        },
    )
        status: OrderStatus;
}