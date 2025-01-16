import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
    constructor(
      @Inject('PRODUCT_SERVICE') private readonly productsClient: ClientProxy,
    ) {}

    @Post()
    createProduct(): string {
        return 'This action adds a new product';
    }

    @Get()
    findAllProducts(): any {
        return this.productsClient.send({ cmd: 'find_all_products' }, {});
    }

    @Get(':id')
    findOne(
      @Param('id') id: string,
    ): string {
        return `This action returns a #${id} product`;
    }

    @Delete(':id')
    deleteProduct(
      @Param('id') id: string,
    ): string {
        return `This action removes a #${id} product`;
    }

    @Patch(':id')
    patchProduct(
      @Body() body: any,
      @Param('id') id: string,
    ): string {
        return `This action updates a #${id} product`;
    }
}
