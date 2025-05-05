import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetalleDerivacionDto } from './dto/create-detalle-derivacion.dto';
import { UpdateDetalleDerivacionDto } from './dto/update-detalle-derivacion.dto';
import { PrismaService } from 'nestjs-prisma';
import { PermittedRol } from './detalle-derivacion.controller';

@Injectable()
export class DetalleDerivacionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: CreateDetalleDerivacionDto,
    user: { id: string; rol: PermittedRol },
  ) {
    if (user.rol !== 'TUTOR') {
      throw new ForbiddenException(
        'Solo el TUTOR puede responder la derivación',
      );
    }
    const derivacion = await this.prisma.derivacion.findUnique({
      where: { id: dto.idDerivacion },
      include: { detalle: true },
    });

    if (!derivacion) {
      throw new NotFoundException('La derivacion no existe');
    }
    if (derivacion.detalle) {
      throw new BadRequestException(
        'La derivacion ya tiene una respuesta registrada',
      );
    }
    return this.prisma.detalleDerivacion.create({
      data: {
        idAdmin: dto.idAdmin,
        idDerivacion: dto.idDerivacion,
        idTutora: dto.idTutora,
        atencion: dto.atencion,
      },
    });
  }

  async findAll() {
    return this.prisma.detalleDerivacion.findMany({
      include: {
        admin: true,
        tutora: true,
        derivacion: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.detalleDerivacion.findUnique({
      where: { id },
      include: {
        admin: true,
        tutora: true,
        derivacion: true,
      },
    });
  }

  update(id: number, updateDetalleDerivacionDto: UpdateDetalleDerivacionDto) {
    return `This action updates a #${id} detalleDerivacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleDerivacion`;
  }
}
