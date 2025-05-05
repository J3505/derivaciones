import { IsString, IsUUID } from 'class-validator';

export class CreateDerivacionDto {
  @IsUUID()
  idDocente: string;

  @IsUUID()
  idEstudiante: string;

  @IsString()
  motivo: string;
}
