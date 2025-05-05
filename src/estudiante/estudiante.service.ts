import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class EstudianteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEstudianteDto) {
    const { correo } = data;
    // Verificar si el estudiante ya existe
    const existeEstudiante = await this.prisma.estudiante.findUnique({
      where: { correo },
    });
    // Si existe, lanzar una excepción
    // Si no existe, crear el estudiante
    if (existeEstudiante) {
      throw new BadRequestException('El correo ya eta registrado');
    }
    try {
      return await this.prisma.estudiante.create({
        data: {
          foto: data.foto,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          correo: data.correo,
          cfp: data.cfp,
          semestre: data.semestre,
          carrera: data.carrera,
          curso: data.curso,
          periodo: data.periodo,
        },
      });
    } catch (error) {
      throw new BadRequestException('Error al crear el estudiante');
    }
  }

  findAll() {
    return this.prisma.estudiante.findMany({
      orderBy: { apellido: 'asc' },
    });
  }

  async findOne(id: string) {
    const estudiante = await this.prisma.estudiante.findUnique({
      where: { id },
    });
    if (!estudiante) {
      throw new BadRequestException('El estudiante no existe');
    }
    return estudiante;
  }

  async update(id: string, data: UpdateEstudianteDto) {
    // Verificar si el estudiante existe
    const estudiante = await this.prisma.estudiante.findUnique({
      where: { id },
    });
    // Si no existe, lanzar una excepción
    if (!estudiante) {
      throw new BadRequestException('El estudiante no existe');
    }
    try {
      return await this.prisma.estudiante.update({
        where: { id },
        data: {
          foto: data.foto,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          correo: data.correo,
          cfp: data.cfp,
          semestre: data.semestre,
          carrera: data.carrera,
          curso: data.curso,
          periodo: data.periodo,
        },
      });
    } catch (error) {
      throw new BadRequestException('Error al actualizar el estudiante');
    }
  }

  async remove(id: string) {
    const estudiante = await this.prisma.estudiante.findUnique({
      where: { id },
    });

    if (!estudiante) {
      throw new BadRequestException('El estudiante no existe');
    }
    return await this.prisma.estudiante.delete({
      where: { id },
    });
  }
}
