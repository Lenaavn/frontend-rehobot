export type MetodoPago = 'EFECTIVO' | 'TARJETA' | 'SIN_DETERMINAR';

export class Pago {
  id: number;
  idCita: number;
  monto: number;
  metodoPago: MetodoPago;
  cita?: {
    fecha: string;
    hora: string;
  };
  
}