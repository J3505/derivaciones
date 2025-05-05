import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles'; // Define una clave para los metadatos de roles
// Este es el nombre de la clave que se usará para almacenar los roles en los metadatos de la ruta
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles); // Usa ROLES_KEY para almacenar los roles
