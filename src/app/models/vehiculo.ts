import { Cita } from './cita';

export class Vehiculo {
  id: number;
  idUsuario: number;
  marca: string;
  modelo: string;
  matricula: string;
  citas: Cita[] = [];
  usuarioId: number;
  activo!: boolean; 
}
