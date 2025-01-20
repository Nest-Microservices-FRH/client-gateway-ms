import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { CreateProductDto, PaginationDto, Product, UpdateProductDto } from 'src/common';

@Controller('products')
export class ProductsController {
    constructor(
      @Inject('PRODUCT_SERVICE') private readonly productsClient: ClientProxy,
    ) {}

    @Post()
    async createProduct(
      @Body() body: CreateProductDto,
    ): Promise<Observable<Product>> {
        return await this.productsClient.send({ cmd: 'create_product' }, body);
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
        return this.productsClient.send({ cmd: 'find_one_product' }, { id })
            .pipe(
                catchError( err => {
                    throw new RpcException(err);
                }),
            );
        // Otra forma de hacerlo
        // try {
        //     const product = await firstValueFrom(
        //         this.productsClient.send({ cmd: 'find_one_product' }, { id }),
        //     );

        //     return product;

        // } catch (error) {
        //     throw new RpcException(error);
        // }
    }

    @Delete(':id')
    deleteProduct(
      @Param('id', ParseIntPipe) id: number,
    ): Observable<Product> {
        return this.productsClient.send({ cmd: 'delete_product' }, { id });
    }

    @Patch(':id')
    async patchProduct(
      @Body() body: UpdateProductDto,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<Observable<Product>> {
        return this.productsClient.send({ cmd: 'update_product' },{ id, ...body });
    }
}
