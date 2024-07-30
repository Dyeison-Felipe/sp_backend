import { Module } from '@nestjs/common';
import { CartItemsController } from './cart_items.controller';
import { CartItemsService } from './cart_items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order_Items } from './entity/cart-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order_Items])],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
