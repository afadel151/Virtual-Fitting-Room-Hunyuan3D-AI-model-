import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async hashPassword(password: string) {
    return await argon.hash(password);
  }

  async comparePasswords(password: string, hash: string) {
    return argon.verify(password, hash);
  }

  async generateToken(user) {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }
}
