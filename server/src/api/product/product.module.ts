import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { ProductProvider } from './product.provider';
import { MerchantModule } from '../merchant/merchant.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory() {
          const schema = ProductSchema;

          return schema;
        },
      },
    ]),
    SharedModule,
    MerchantModule
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductProvider],
})
export class ProductModule { }
