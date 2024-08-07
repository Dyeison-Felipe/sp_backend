import { UserEntity } from '../entity/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMocks: UserEntity = {
  createdAt: new Date(),
  email: 'testeMock@email.com',
  id: 34242,
  name: 'Teste de Mock',
  number_phone: '42-99999-9999',
  password: 'Minha senha grande',
  role: UserType.User,
  updatedAt: new Date(),
};
