import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDetalleDerivacionDto {
  @IsUUID()
  idDerivacion: string;

  @IsUUID()
  idAdmin: string;

  @IsUUID()
  idTutora: string;

  @IsString()
  @IsNotEmpty()
  atencion: string;
}
