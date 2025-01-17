import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { PaginationDto, Product } from 'src/common';

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
    ): Observable<Product[]> {
        return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto);
    }

    @Get(':id')
    async findOne(
      @Param('id') id: string,
    ): Promise<Observable<Product>> {
        try {
            const product = await firstValueFrom(
                this.productsClient.send({ cmd: 'find_one_product' }, { id }),
            );

            return product;

        } catch (error) {
            throw new RpcException(error);
        }
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
