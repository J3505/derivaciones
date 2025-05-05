import { Module } from '@nestjs/common';
import { DetalleDerivacionService } from './detalle-derivacion.service';
import { DetalleDerivacionController } from './detalle-derivacion.controller';

@Module({
  controllers: [DetalleDerivacionController],
  providers: [DetalleDerivacionService],
})
export class DetalleDerivacionModule {}
