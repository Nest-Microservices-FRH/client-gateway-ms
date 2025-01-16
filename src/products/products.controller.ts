import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

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
    findAllProducts(
      @Query() paginationDto: PaginationDto,
    ): any {
        return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto);
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
