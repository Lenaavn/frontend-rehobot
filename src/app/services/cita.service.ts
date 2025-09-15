import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CitaDTO, Estado } from '../models/citaDTO';
import { LocalDate, LocalTime } from '@js-joda/core';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private url = "http://backend-rehobot.onrender.com/rehobot/api/citas";

  constructor(private clientHttp: HttpClient) { }

  listarCitas(): Observable<CitaDTO[]> {
    return this.clientHttp.get<CitaDTO[]>(this.url);
  }

  obtenerCitaPorId(id: number): Observable<CitaDTO> {
    return this.clientHttp.get<CitaDTO>(`${this.url}/${id}`);
  }

  crearCita(cita: { idVehiculo: number; idServicio: number; fecha: string; hora: string }): Observable<any> {
    return this.clientHttp.post<CitaDTO>(this.url, cita, { responseType: 'text' as 'json' });
  }

  actualizarCita(id: number, citaActualizada: {
    idVehiculo: number; idServicio: number; idPago: number; fecha: string;
    hora: string; estado: Estado
  }): Observable<any> {
    return this.clientHttp.put<CitaDTO>(`${this.url}/${id}`, citaActualizada, { responseType: 'text' as 'json' });
  }

  eliminarCita(id: number): Observable<void> {
    return this.clientHttp.delete<void>(`${this.url}/${id}`);
  }

  listarCitasPagadas(): Observable<CitaDTO[]> {
    return this.clientHttp.get<CitaDTO[]>(`${this.url}/pagadas`);
  }

  listarCitasNoPagadas(): Observable<CitaDTO[]> {
    return this.clientHttp.get<CitaDTO[]>(`${this.url}/noPagadas`);
  }

  listarCitasPorUsuario(idUsuario: number): Observable<CitaDTO[]> {
    return this.clientHttp.get<CitaDTO[]>(`${this.url}/usuario/${idUsuario}`);
  }

  obtenerHorasOcupadas(idServicio: number, fecha: string): Observable<string[]> {
    return this.clientHttp.get<string[]>(`${this.url}/ocupadas/${idServicio}/${fecha}`);
  }

  listarCitasHoy(): Observable<CitaDTO[]> {
    return this.clientHttp.get<CitaDTO[]>(`${this.url}/hoy`);
  }

}
