import { Cart_Items } from 'src/cart_items/entity/cart-items.entity';
import { Order } from 'src/orders/entity/order.entity';
import { User } from 'src/user/entity/user.entity';
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @OneToOne(() => Order, (order) => order.cart)
  order: Order;

  @OneToMany(() => Cart_Items, (cart_items) => cart_items.cart)
  cart_items: Cart_Items[];
}
