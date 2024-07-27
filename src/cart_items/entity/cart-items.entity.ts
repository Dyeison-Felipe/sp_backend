import { Cart } from 'src/cart/entity/cart.entity';
import { Product } from 'src/product/entity/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart_Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.cart_items)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  products: Product[];

  @ManyToOne(() => Cart, (cart) => cart.cart_items)
  cart: Cart;
}
