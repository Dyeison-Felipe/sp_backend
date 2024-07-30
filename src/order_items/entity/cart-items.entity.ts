import { ProductEntity } from 'src/product/entity/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Order_items' })
export class Order_Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @JoinTable({ name: 'Order_Products' })
  @ManyToMany(() => ProductEntity, (product) => product.order_items)
  products: ProductEntity[];
}
