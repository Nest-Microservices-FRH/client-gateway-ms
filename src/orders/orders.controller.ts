import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { Order } from './entities/order.entity';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
    constructor(
      @Inject('ORDER_SERVICE') private readonly ordersClient: ClientProxy,
    ) {}

  @Post()
    create(@Body() createOrderDto: CreateOrderDto): Observable<Order> {
        return this.ordersClient.send('createOrder', createOrderDto);
    }

  @Get()
  findAll(
    @Query() paginationDto: OrderPaginationDto,
  ) {
      return this.ordersClient.send('findAllOrders', paginationDto);
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Observable<Order> {
      return this.ordersClient.send('findOneOrder', { id })
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
      return this.ordersClient.send('findAllOrders', { ...paginationDto, ...statusDto })
          .pipe(
              catchError( err => {
                  throw new RpcException(err);
              }),
          );
  }
}
