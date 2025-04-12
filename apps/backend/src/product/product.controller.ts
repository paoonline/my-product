import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('/product')
export class productController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.productService.create(createProductDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Product created successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create product',
        error: error.message,
      });
    }
  }

  @Get(':lang/:name/:page')
  async productSearchMultiLang(
    @Param('lang') lang: string,
    @Param('name') name: string,
    @Param('page') page: string,
    @Query('limit') limit = 10,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const result = await this.productService.findByNameAndLang(
        name,
        lang,
        +page,
        +limit,
      );
      return res
        .status(200)
        .json({ data: result, message: 'Product search successfully' });
    } catch (err) {
      return res.status(500).json({ message: err.message, error: err.message });
    }
  }
}
