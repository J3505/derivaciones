import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @IsNotEmpty()
  foto: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  cfp: string;

  @IsString()
  @IsNotEmpty()
  semestre: string;

  @IsString()
  @IsNotEmpty()
  carrera: string;

  @IsString()
  @IsNotEmpty()
  curso: string;

  @IsString()
  @IsNotEmpty()
  periodo: string;
}
