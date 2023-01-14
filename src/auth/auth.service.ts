import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDTO } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('User does not exist');
    const pwMtches = await argon.verify(user.hash, dto.password);
    if (!pwMtches) throw new ForbiddenException('Incorrect credentials');
    delete user.hash;
    return user;
  }

  async signup(dto: AuthDTO) {
    try {
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
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if ((error.code = 'P2002')) {
          throw new ForbiddenException('User already exists');
        }
      }
    }
  }
}
