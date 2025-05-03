import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { EstudianteModule } from './estudiante/estudiante.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    EstudianteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
