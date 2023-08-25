import { UserModel } from './../../../../apps/api/src/domain/model/user';
import { BcryptService } from './../../../../apps/api/src/infrastructure/services/bcrypt/bcrypt.service';
import { PrismaClient, User } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(private readonly bcryptService: BcryptService) {}

  toUserModel(user: any): UserModel {
    const userModel = new UserModel();
    userModel.id = user.id;
    userModel.email = user.email;
    userModel.name = user.name;
    userModel.role = user.role;

    return userModel;
  }

  async getUsers(): Promise<UserModel[]> {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users.map((user) => this.toUserModel(user));
  }

  async findUserById(id: string): Promise<UserModel> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return this.toUserModel(user);
  }

  async createUser(data: CreateUserDTO): Promise<UserModel> {
    return this.toUserModel(
      await prisma.user.create({
        data: {
          ...data,
          password: await this.bcryptService.hash(data.password),
        },
      })
    );
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<UserModel> {
    await this.findUserById(id);
    const user = await prisma.user.update({ where: { id }, data });

    return this.toUserModel(user);
  }

  async destroyUser(id: string) {
    await this.findUserById(id);
    return await prisma.user.delete({ where: { id } });
  }
}
