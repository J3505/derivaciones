import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { EstudianteModule } from './estudiante/estudiante.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { DerivacionModule } from './derivacion/derivacion.module';
import { DetalleDerivacionModule } from './detalle-derivacion/detalle-derivacion.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    EstudianteModule,
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1d' },
    }),
    DerivacionModule,
    DetalleDerivacionModule,
  ],
})
export class AppModule {}
