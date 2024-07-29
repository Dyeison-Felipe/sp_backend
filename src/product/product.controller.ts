import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ReturnProductDto } from './dtos/returnProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct(): Promise<ProductEntity[]> {
    return this.productService.getAllProduct();
  }

  @Get('/:productId')
  async getAllProductId(
    @Param('productId') productId: number,
  ): Promise<ReturnProductDto> {
    const product = await this.productService.getAllProductId(productId);

    return new ReturnProductDto(product);
  }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ReturnProductDto> {
    const product = await this.productService.createProduct(createProductDto);

    return new ReturnProductDto(product);
  }

  @Put('/:productId')
  async updateProduct(
    @Param('productId') productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ReturnProductDto> {
    const product = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );

    return new ReturnProductDto(product);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: number) {
    return await this.productService.deleteProduct(productId);
  }
}
