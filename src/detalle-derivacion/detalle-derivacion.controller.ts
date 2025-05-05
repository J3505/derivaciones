import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

// Define the allowed roles type
export type PermittedRol = 'PROFESOR' | 'TUTOR';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    rol: PermittedRol;
  };
}

import { DetalleDerivacionService } from './detalle-derivacion.service';
import { CreateDetalleDerivacionDto } from './dto/create-detalle-derivacion.dto';
import { UpdateDetalleDerivacionDto } from './dto/update-detalle-derivacion.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('detalle-derivacion')
@UseGuards(JwtAuthGuard)
export class DetalleDerivacionController {
  constructor(private readonly service: DetalleDerivacionService) {}

  @Post()
  async create(
    @Body() dto: CreateDetalleDerivacionDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const user = req.user;

    return this.service.create(dto, user);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetalleDerivacionDto: UpdateDetalleDerivacionDto,
  ) {
    return this.service.update(+id, updateDetalleDerivacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
