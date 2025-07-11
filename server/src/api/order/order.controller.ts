import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleNames } from '../user/enums';
import { Auth, Roles } from 'src/shared/decorators/auth.decorators';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { OrderProvider } from './order.provider';
import { CreateOrderDto } from './dto/create-order.dto';
import { CheckoutService } from './services/checkout.service';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderProvider: OrderProvider, private readonly checkoutService: CheckoutService) { }

  @Post('/checkout')
  @Roles([RoleNames.CUSTOMER])
  @ApiOperation({ summary: 'Initiate order checkout' })
  @ApiBearerAuth()
  initiateCheckout(@Auth('_id') userId: string, @Body() createOrderDto: CreateOrderDto) {
    return this.checkoutService.initiateCheckout(createOrderDto, userId);
  }

  @Get('/customer')
  @Roles([RoleNames.CUSTOMER])
  @ApiOperation({ summary: 'Get customer orders' })
  @ApiBearerAuth()
  getCustomerOrders(@Auth('_id') userId: string, @Query() query: GetOrdersDto) {
    return this.orderProvider.getCustomerOrders(userId, query);
  }

  @Get('/merchant')
  @Roles([RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Get merchant orders' })
  @ApiBearerAuth()
  getMerchantOrders(@Auth('_id') userId: string, @Query() query: GetOrdersDto) {
    return this.orderProvider.getMerchantOrders(userId, query);
  }

  @Get('/:orderId/customer')
  @Roles([RoleNames.CUSTOMER])
  @ApiOperation({ summary: 'Get customer order' })
  @ApiBearerAuth()
  getOrder(@Auth('_id') userId: string, @Param('orderId') orderId: string) {
    return this.orderProvider.getCustomerOrder(orderId, userId);
  }

  @Get('/:orderId/merchant')
  @Roles([RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Get merchant order' })
  @ApiBearerAuth()
  getMerchantOrder(@Auth('_id') userId: string, @Param('orderId') orderId: string) {
    return this.orderProvider.getMerchantOrder(userId, orderId);
  }

  @Patch(':orderId/status')
  @Roles([RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Update order status' })
  @ApiBearerAuth()
  updateOrder(@Param('orderId') orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderProvider.updateOrderStatus(orderId, updateOrderDto);
  }

  @Delete(':orderId')
  @Roles([RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Delete order' })
  @ApiBearerAuth()
  deleteOrder(@Param('orderId') orderId: string) {
    return this.orderProvider.deleteOrder(orderId);
  }
}
