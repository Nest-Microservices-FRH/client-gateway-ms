import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { CreateProductDto, PaginationDto, Product, UpdateProductDto } from 'src/common';
import { NATS_SERVICE } from 'src/config/services';

@Controller('products')
export class ProductsController {
    constructor(
      @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) {}

    @Post()
    createProduct(
      @Body() body: CreateProductDto,
    ): Observable<Product> {
        return this.client.send({ cmd: 'create_product' }, body);
    }

    @Get()
    findAllProducts(
      @Query() paginationDto: PaginationDto,
    ): Observable<Product[]> {
        return this.client.send({ cmd: 'find_all_products' }, paginationDto);
    }

    @Get(':id')
    findOne(
      @Param('id') id: string,
    ): Observable<Product> {
        return this.client.send({ cmd: 'find_one_product' }, { id })
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
        return this.client.send({ cmd: 'delete_product' }, { id })
            .pipe(
                catchError( err => {
                    throw new RpcException(err);
                }),
            );
    }

    @Patch(':id')
    patchProduct(
      @Body() body: UpdateProductDto,
      @Param('id', ParseIntPipe) id: number,
    ): Observable<Product> {
        return this.client.send({ cmd: 'update_product' },{
            id,
            ...body,
        }).pipe(
            catchError( err => {
                throw new RpcException(err);
            }),
        );
    }
}
