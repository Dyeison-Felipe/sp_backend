import { Cart_Items } from 'src/cart_items/entity/cart-items.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'stock', nullable: false })
  stock: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @OneToMany(() => Cart_Items, (cart_items) => cart_items)
  cart_items?: Cart_Items;
}
