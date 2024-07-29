import { Cart_Items } from 'src/cart_items/entity/cart-items.entity';
import { Order } from 'src/orders/entity/order.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Cart' })
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.cart, { cascade: true })
  @JoinColumn({ name: 'User', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToOne(() => Order, (order) => order.cart)
  order: Order;

  @OneToMany(() => Cart_Items, (cart_items) => cart_items.cart, {
    cascade: true,
  })
  cart_items: Cart_Items[];
}
