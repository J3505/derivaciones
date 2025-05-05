import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('admin-data')
  @Roles('ADMIN')
  getAdminData() {
    return {
      message: 'Esta es la información de administrador',
    };
  }

  @Get('tutor-data')
  @Roles('TUTOR')
  getTutorData() {
    return {
      message: 'Solo tutores pueden ver esto',
    };
  }

  @Post()
  @Roles('ADMIN')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
