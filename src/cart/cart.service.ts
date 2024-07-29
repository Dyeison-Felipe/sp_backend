import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entity/cart.entity';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
  ) {}

  async createCartForUser(userEntity: UserEntity): Promise<CartEntity> {
    const cart = this.cartRepository.create({
      user: userEntity,
      cart_items: [],
    });
    return this.cartRepository.save(cart);
  }
}
