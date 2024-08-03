// Importa os módulos e classes necessários do NestJS
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from 'src/auth/dtos/loginPayload.dto'; // Importa o DTO para o payload do login
import { ROLES_KEY } from 'src/decorators/roles.decorator'; // Importa a chave usada no decorador de funções que define os papéis (roles)
import { UserType } from 'src/user/enum/user-type.enum'; // Enum que define os tipos de usuários

// Decorador que marca esta classe como um serviço injetável no NestJS
@Injectable()
export class RolesGuard implements CanActivate {
  // Construtor da classe que injeta as dependências necessárias
  constructor(
    private reflector: Reflector, // Serviço que permite acessar metadados de decoradores
    private readonly jwtService: JwtService, // Serviço para trabalhar com JWT (JSON Web Tokens)
  ) {}

  // Método que determina se a rota pode ser acessada ou não
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtém os papéis (roles) necessários para acessar a rota atual usando o refletor
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY, // Chave que identifica os papéis necessários
      [context.getHandler(), context.getClass()], // Obtém os metadados do manipulador e da classe
    );

    // Se não há papéis específicos requeridos, permite o acesso à rota
    if (!requiredRoles) {
      return true;
    }

    // Obtém o token JWT do cabeçalho da requisição
    const { authorization } = context.switchToHttp().getRequest().headers;

    // Tenta verificar e decodificar o token JWT
    const loginPaylod: LoginPayload | undefined = await this.jwtService
      .verifyAsync(authorization, {
        secret: process.env.JWT_SECRET, // Segredo usado para verificar o token
      })
      .catch(() => undefined); // Em caso de erro na verificação, retorna undefined

    // Se não conseguir decodificar o token, bloqueia o acesso
    if (!loginPaylod) {
      return false;
    }

    // Verifica se algum dos papéis do usuário está entre os papéis requeridos
    return requiredRoles.some((role) => role === loginPaylod.role);
  }
}
