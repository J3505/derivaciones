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
import { DerivacionService } from './derivacion.service';
import { CreateDerivacionDto } from './dto/create-derivacion.dto';
import { UpdateDerivacionDto } from './dto/update-derivacion.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('derivacion')
export class DerivacionController {
  constructor(private readonly derivacionService: DerivacionService) {}
  @UseGuards(JwtAuthGuard)
  @Roles(Rol.PROFESOR)
  @Post()
  create(@Body() dto: CreateDerivacionDto) {
    return this.derivacionService.create(dto);
  }

  @Get()
  findAll() {
    return this.derivacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.derivacionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDerivacionDto: UpdateDerivacionDto,
  ) {
    return this.derivacionService.update(+id, updateDerivacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.derivacionService.remove(+id);
  }
}
