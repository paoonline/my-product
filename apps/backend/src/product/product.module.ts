import { Module } from '@nestjs/common';
import { productController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductTranslation } from './product-translation.entity';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductTranslation])],
  controllers: [productController],
  exports: [TypeOrmModule], 
  providers: [ProductService],
})
export class ProductModule {}
