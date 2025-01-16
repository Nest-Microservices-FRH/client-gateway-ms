import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    controllers: [ProductsController],
    providers  : [],
    imports    : [
        ClientsModule.register([
            {
                name     : 'PRODUCT_SERVICE',
                transport: Transport.TCP,
            },
        ]),
    ],
})
export class ProductsModule {}
