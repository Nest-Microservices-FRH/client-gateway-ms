import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { Order } from './entities/order.entity';

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
  findAll() {
      return this.ordersClient.send('findAllOrders', {});
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Observable<Order> {
      return this.ordersClient.send('findOneOrder', { id })
          .pipe(
              catchError( err => {
                  throw new RpcException(err);
              }),
          );
  }
}
