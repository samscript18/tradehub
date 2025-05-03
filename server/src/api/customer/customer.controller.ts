import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, Roles } from 'src/shared/decorators/auth.decorators';
import { MongoIdPipe } from 'src/core/pipes';
import { RoleNames } from '../user/enums';
import { CustomerProvider } from './customer.provider';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('Customer')
@ApiTags('Customer')
@ApiBearerAuth()
export class CustomerController {
   constructor(private readonly CustomerProvider: CustomerProvider) { }

   @Get('')
   @ApiOperation({ summary: 'Get Customers' })
   @Roles([RoleNames.ADMIN])
   async getCustomers() {
      const data = await this.CustomerProvider.getCustomers();

      return data;
   }

   @Get(':CustomerId')
   @Roles([RoleNames.CUSTOMER])
   @ApiOperation({ summary: 'Get Customer by id' })
   async getCustomer(@Param('CustomerId', MongoIdPipe) CustomerId: string) {
      const data = await this.CustomerProvider.getCustomer(CustomerId);

      return data;
   }

   @Put()
   @Roles([RoleNames.CUSTOMER])
   @ApiOperation({ summary: 'Update Customer' })
   async updateCustomer(@Auth('_id') userId: string, @Body() updateCustomerDto: UpdateCustomerDto) {
      const data = await this.CustomerProvider.updateCustomer(updateCustomerDto, userId);

      return data;
   }
}
