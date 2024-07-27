import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UserModule,
    OrdersModule,
    CartModule,
    CartItemsModule,
    ProductModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
