import { ReturnUserDto } from 'src/user/dtos/returnUser.sto';

export class ReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
