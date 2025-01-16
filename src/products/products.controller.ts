import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    constructor() {}

    @Post()
    createProduct(): string {
        return 'This action adds a new product';
    }

    @Get()
    findAllProducts(): string {
        return 'This action returns all products';
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
