import { Injectable } from '@nestjs/common';
import { AuthDTO } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return { message: 'I am signed in' };
  }
  async signup(dto: AuthDTO) {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: { email: dto.email, hash },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        created_at: true,
        updated_at: true,
      },
    });
    return user;
  }
}
