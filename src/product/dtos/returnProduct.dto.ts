import { ProductEntity } from '../entity/product.entity';

export class ReturnProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  updated_at: Date;
  constructor(productEntity: ProductEntity) {
    this.name = productEntity.name;
    this.description = productEntity.description;
    this.price = productEntity.price;
    this.stock = productEntity.stock;
    this.updated_at = productEntity.updatedAt;
  }
}
