import { Cart } from 'src/cart/entity/cart.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'status', nullable: false })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @OneToOne(() => Cart, (cart) => cart.order)
  cart: Cart;
}
