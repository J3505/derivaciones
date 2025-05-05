import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleDerivacionDto } from './create-detalle-derivacion.dto';

export class UpdateDetalleDerivacionDto extends PartialType(CreateDetalleDerivacionDto) {}
