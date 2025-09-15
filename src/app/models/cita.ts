export class Cita {
  id: number;
  fecha: string;
  estado: any;
  hora: any;

  constructor(id: number, fecha: string) {
    this.id = id;
    this.fecha = fecha;
  }
}
