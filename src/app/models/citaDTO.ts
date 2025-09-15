import { LocalDate, LocalTime } from "@js-joda/core";

export type Nombre = 'LAVADO_ASPIRADO_COCHE_PEQUENO' | 'LAVADO_ASPIRADO_CAMIONETA'
    | 'LAVADO_TAPICERIA_COCHE_PEQUENO' | 'PULIDO_FAROS' | 'DETALLADO_COMPLETO' | 'TRATAMIENTO_CERAMICO';

export type Estado = 'PAGADA' | 'NO_PAGADA';

export class CitaDTO {
    id!: number;
    idVehiculo!: number;
    vehiculo!: string;
    idServicio!: number;
    servicio!: Nombre;
    nombreUsuario!: string;
    idPago!: number;
    fecha!: string;
    hora!: string;
    estado!: Estado;
}
