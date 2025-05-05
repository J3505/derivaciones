import { Injectable } from '@nestjs/common';
import { CreateDerivacionDto } from './dto/create-derivacion.dto';
import { UpdateDerivacionDto } from './dto/update-derivacion.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DerivacionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDerivacionDto) {
    const derivacion = await this.prisma.derivacion.create({
      data: {
        idDocente: dto.idDocente,
        idEstudiante: dto.idEstudiante,
        motivo: dto.motivo,
      },
      include: {
        docente: true,
        estudiante: true,
      },
    });
    return derivacion;
  }

  findAll() {
    return this.prisma.derivacion.findMany({
      include: {
        docente: true,
        estudiante: true,
        detalle: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.derivacion.findUnique({
      where: { id },
      include: {
        docente: true,
        estudiante: true,
        detalle: true,
      },
    });
  }

  update(id: number, updateDerivacionDto: UpdateDerivacionDto) {
    return `This action updates a #${id} derivacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} derivacion`;
  }
}
