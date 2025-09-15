export type Nombre = 'LAVADO_ASPIRADO_COCHE_PEQUENO'|'LAVADO_ASPIRADO_CAMIONETA'
|'LAVADO_TAPICERIA_COCHE_PEQUENO'|'PULIDO_FAROS'|'DETALLADO_COMPLETO'|'TRATAMIENTO_CERAMICO';

export class Servicio {
    id: number;
    nombre: Nombre;
    descripcion: string;
    precio: number;
    activo?: boolean; 
} 
