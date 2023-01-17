import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(userId: number, dto: EditUserDTO) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        email: dto?.email,
        first_name: dto?.firstName,
        last_name: dto?.lastName,
      },
    });
    delete user.hash;
    return user;
  }
}
