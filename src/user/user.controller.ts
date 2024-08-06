import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { ReturnUserDto } from './dtos/returnUser.sto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { UserEntity } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.createUser(createUserDto);
    return new ReturnUserDto(user);
  }

  @Get()
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Get('/:userId')
  async getAllUserId(@Param('userId') userId: number): Promise<ReturnUserDto> {
    const user = await this.userService.getAllUserById(userId);
    return new ReturnUserDto(user);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.updateUser(userId, updateUserDto);
    return new ReturnUserDto(user);
  }

  @Patch(':id/password')
  async updatePassword(
    @Param('id') userId: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return await this.userService.updatePasswordUser(updatePasswordDto, userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
