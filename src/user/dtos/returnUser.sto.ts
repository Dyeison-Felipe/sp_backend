import { CartEntity } from 'src/cart/entity/cart.entity';
import { UserEntity } from '../entity/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  number_phone: string;
  password: string;
  role: string;
  cart: CartEntity;
  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.number_phone = userEntity.number_phone;
    this.password = userEntity.password;
    this.role = userEntity.role;
    this.cart = userEntity.cart;
  }
}
