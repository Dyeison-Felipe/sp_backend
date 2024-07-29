import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UserService {
  // 1 - primeiro devemos criar um repository de ususarios

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly cartService: CartService,
  ) {}

  // 2 - começamos criando os metodos
  // 2.1 - o primeiro metodo é o de buscra todos os registros no banco de dados
  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  // 2.2 - O segundo metodo é o de buscar usuário por id
  async getAllUserId(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['cart'],
    });

    if (!user) {
      throw new NotFoundException(`user id ${userId} NotFound`);
    }

    return user;
  }

  // 2.3 - o terceiro metodo é o de criar um novo usuario.
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    // aqui começo salvando a senha com um hash, mas ainda não esta validando login
    const saltOrRounds = 10;
    const passwordHash = await hash(createUserDto.password, saltOrRounds);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: passwordHash,
    });

    const savedUser = await this.userRepository.save(newUser);

    // aqui cria o carrinho do usuario ao criar o mesmo
    await this.cartService.createCartForUser(savedUser);

    return savedUser;
  }

  // 2.4 - o quarto metodo é o de poder editar os dados do usuário
  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`user id ${userId} NotFound`);
    }

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  // 2.5 - o quinto metodo é o de excluir uusario
  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`user id ${userId} NotFound`);
    }

    return this.userRepository.remove(user);
  }
}
