import { RolesGuard } from './../../../../apps/api/src/infrastructure/common/guards/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { JwtAuthGuard } from '../../../../apps/api/src/infrastructure/common/guards/jwtAuth.guard';
import { Roles } from '../../../../apps/api/src/infrastructure/common/decorators/roles.decorators';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  async getUserById(@Param('id') id: string) {
    return await this.usersService.findUserById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  async createUser(@Body() createUserDto: CreateUserDTO) {
    return await this.usersService.createUser(createUserDto);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO
  ) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  async destroyUser(@Param('id') id: string) {
    return await this.usersService.destroyUser(id);
  }
}
