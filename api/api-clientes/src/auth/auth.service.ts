import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(username: string, password: string) {
    if (username !== 'admin' || password !== 'admin') {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      username: 'admin',
      role: 'admin',
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
