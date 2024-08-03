import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDto } from './dtos/returnLogin.dto';

// A anotação @Controller('auth') define que essa classe é um controlador
// e que todas as rotas dentro dela serão prefixadas com 'auth'.
@Controller('auth')
export class AuthController {
  // O construtor recebe uma instância de AuthService, que é injetada automaticamente pelo NestJS.
  constructor(private authService: AuthService) {}

  // A anotação @UsePipes(ValidationPipe) aplica um pipe de validação a esse método específico.
  // O ValidationPipe valida automaticamente o objeto `loginDto` de acordo com as regras definidas no DTO.
  @UsePipes(ValidationPipe)
  // A anotação @Post() define que esse método será chamado quando houver uma requisição HTTP POST
  // para a rota 'auth/' (prefixada pelo controlador).
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto> {
    // O método `login` recebe o objeto `loginDto` do corpo da requisição,
    // e delega a autenticação para o AuthService, retornando o resultado.
    return await this.authService.login(loginDto);
  }
}
