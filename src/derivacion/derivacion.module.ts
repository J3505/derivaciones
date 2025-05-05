import { Module } from '@nestjs/common';
import { DerivacionService } from './derivacion.service';
import { DerivacionController } from './derivacion.controller';

@Module({
  controllers: [DerivacionController],
  providers: [DerivacionService],
})
export class DerivacionModule {}
