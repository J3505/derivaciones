import { Test, TestingModule } from '@nestjs/testing';
import { DetalleDerivacionController } from './detalle-derivacion.controller';
import { DetalleDerivacionService } from './detalle-derivacion.service';

describe('DetalleDerivacionController', () => {
  let controller: DetalleDerivacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleDerivacionController],
      providers: [DetalleDerivacionService],
    }).compile();

    controller = module.get<DetalleDerivacionController>(DetalleDerivacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
