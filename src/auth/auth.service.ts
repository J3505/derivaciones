import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

interface JwtPayload {
  sub: string; // ID del usuario
  email: string; // Email del usuario
  rol: string; // Rol del usuario
  iat?: number; // Timestamp de emisión del token
  exp?: number; // Timestamp de expiración del token
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto) {
    // Verificar si el email ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Verificar si el teléfono ya existe
    const existingPhone = await this.prisma.user.findFirst({
      where: { telefono: data.telefono },
    });
    if (existingPhone) {
      throw new Error('El teléfono ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return { message: 'Usuario registrado correctamente', user };
  }

  async login(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      rol: user.rol,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Usuario logueado correctamente',
      token,
      user: {
        id: user.id,
        email: user.email,
        rol: user.rol,
      },
    };
  }

  async refreshToken(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      rol: user.rol,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Token actualizado correctamente',
      token,
      user: {
        id: user.id,
        email: user.email,
        rol: user.rol,
      },
    };
  }
}
