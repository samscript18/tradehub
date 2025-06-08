import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleNames } from '../user/enums';
import { Auth, IsPublic, Roles } from 'src/shared/decorators/auth.decorators';
import { ProductProvider } from './product.provider';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { ProductStatus } from './enums/product.enum';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productProvider: ProductProvider) { }

  @Post()
  @Roles([RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Create/Upload product' })
  @ApiBearerAuth()
  createProduct(@Auth('_id') userId: string, @Body() createProductDto: CreateProductDto) {
    return this.productProvider.createProduct(createProductDto, userId);
  }

  // @Get()
  // @IsPublic()
  // @ApiOperation({ summary: 'Get property listings' })
  // getPropertyListings(@Query() query: GetPropertyListingsDto) {
  //   const newQuery = { ...query, status: PropertyListingStatus.APPROVED }
  //   return this.propertyListingProvider.getPropertyListings(newQuery);
  // }

  @Get('filters')
  @IsPublic()
  @ApiOperation({ summary: 'Get products filters' })
  getProductsFilters() {
    return this.productProvider.getProductsFilters();
  }

  @Get()
  @Roles([RoleNames.CUSTOMER])
  @ApiOperation({ summary: 'Get products' })
  @ApiBearerAuth()
  getUserProducts(@Query() query: GetProductsDto) {
    const newQuery = { ...query, status: ProductStatus.APPROVED }
    return this.productProvider.getProducts(newQuery);
  }

  @Get('merchant')
  @Roles([RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Get merchant products' })
  @ApiBearerAuth()
  getMerchantProducts(@Auth('_id') userId: string, @Query() query: GetProductsDto) {
    return this.productProvider.getMerchantProducts(userId, query);
  }

  @Get(':productId')
  @Roles([RoleNames.CUSTOMER, RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Get product' })
  @ApiBearerAuth()
  getProduct(@Param('productId') productId: string) {
    return this.productProvider.getProduct(productId);
  }

  @Get('/:productId/merchant')
  @Roles([RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Get merchant product' })
  @ApiBearerAuth()
  getMerchantProduct(@Auth('_id') userId: string, @Param('productId') productId: string) {
    return this.productProvider.getMerchantProduct(userId, productId);
  }

  @Patch(':productId')
  @Roles([RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Update product' })
  @ApiBearerAuth()
  updateProduct(@Param('productId') productId: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productProvider.updateProduct(productId, updateProductDto);
  }

  @Delete(':productId')
  @Roles([RoleNames.MERCHANT])
  @ApiOperation({ summary: 'Delete product' })
  @ApiBearerAuth()
  deleteProduct(@Param('productId') productId: string) {
    return this.productProvider.deleteProduct(productId);
  }
}
