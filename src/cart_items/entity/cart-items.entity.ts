import { CartEntity } from 'src/cart/entity/cart.entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Cart_items' })
export class Cart_Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @ManyToOne(() => ProductEntity, (product) => product.cart_items)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  products: ProductEntity[];

  @ManyToOne(() => CartEntity, (cart) => cart.cart_items)
  cart: CartEntity;
}
