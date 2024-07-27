import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres', // Certifique-se de que esta linha está correta
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [`${__dirname}/**/*.entity{.ts,*.js}`],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
})
export class DatabaseModule {}
