import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { Order } from './entities/order.entity';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config/services';

@Controller('orders')
export class OrdersController {
    constructor(
      @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) {}

  @Post()
    create(@Body() createOrderDto: CreateOrderDto): Observable<Order> {
        return this.client.send('createOrder', createOrderDto);
    }

  @Get()
  findAll(
    @Query() paginationDto: OrderPaginationDto,
  ) {
      return this.client.send('findAllOrders', paginationDto);
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Observable<Order> {
      return this.client.send('findOneOrder', { id })
          .pipe(
              catchError( err => {
                  throw new RpcException(err);
              }),
          );
  }

  @Get(':status')
  findAllByStatus(
    @Query() paginationDto: PaginationDto,
    @Param() statusDto: StatusDto,
  ) {
      return this.client.send('findAllOrders', { ...paginationDto, ...statusDto })
          .pipe(
              catchError( err => {
                  throw new RpcException(err);
              }),
          );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
      return this.client.send('changeOrderStatus', { id, ...statusDto })
          .pipe(
              catchError( err => {
                  throw new RpcException(err);
              }),
          );
  }
}
