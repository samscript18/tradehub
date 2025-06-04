import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, Roles } from 'src/shared/decorators/auth.decorators';
import { MongoIdPipe } from 'src/core/pipes';
import { RoleNames } from '../user/enums';
import { CustomerProvider } from './customer.provider';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
@ApiTags('Customer')
@ApiBearerAuth()
export class CustomerController {
   constructor(private readonly customerProvider: CustomerProvider) { }

   @Get('')
   @ApiOperation({ summary: 'Get Customers' })
   @Roles([RoleNames.ADMIN])
   async getCustomers() {
      const data = await this.customerProvider.getCustomers();

      return data;
   }


   @Get('/user')
   @Roles([RoleNames.CUSTOMER])
   @ApiOperation({ summary: 'Get user customer profile' })
   async getUserCustomer(@Auth('_id') userId: string) {
      const data = await this.customerProvider.getUserCustomer(userId);

      return data;
   }

   @Get(':customerId')
   @Roles([RoleNames.CUSTOMER])
   @ApiOperation({ summary: 'Get Customer by id' })
   async getCustomer(@Param('customerId') customerId: string) {
      const data = await this.customerProvider.getCustomer(customerId);

      return data;
   }

   @Put()
   @Roles([RoleNames.CUSTOMER])
   @ApiOperation({ summary: 'Update Customer' })
   async updateCustomer(@Auth('_id') userId: string, @Body() updateCustomerDto: UpdateCustomerDto) {
      const data = await this.customerProvider.updateCustomer(updateCustomerDto, userId);

      return data;
   }
}
