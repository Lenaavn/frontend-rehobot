import { Vehiculo } from './vehiculo';

export type Rol = 'ADMIN' | 'USER' | 'GUEST';

export class Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  rol: Rol;
  contrasena: string;
  vehiculos: Vehiculo[] = [];
  activo!: boolean;
}
