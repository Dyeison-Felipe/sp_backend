import { Cart_Items } from 'src/cart_items/entity/cart-items.entity';
import { Order } from 'src/orders/entity/order.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @OneToOne(() => Order, (order) => order.cart)
  order: Order;

  @OneToMany(() => Cart_Items, (cart_items) => cart_items.cart)
  @JoinColumn({ name: 'cart_items_id', referencedColumnName: 'id' })
  cart_items: Cart_Items[];
}
