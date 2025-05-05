import { Test, TestingModule } from '@nestjs/testing';
import { DetalleDerivacionService } from './detalle-derivacion.service';

describe('DetalleDerivacionService', () => {
  let service: DetalleDerivacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleDerivacionService],
    }).compile();

    service = module.get<DetalleDerivacionService>(DetalleDerivacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
