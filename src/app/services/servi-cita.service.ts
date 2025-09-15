import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiCita } from '../models/serviCita';

@Injectable({
  providedIn: 'root'
})
export class ServiCitaService {

  private url = "http://backend:8080/rehobot/api/servicitas";

  constructor(private clientHttp: HttpClient) { }

  listarServiCitas(): Observable<ServiCita[]> {
    return this.clientHttp.get<ServiCita[]>(this.url);
  }

  obtenerServiCitaPorId(id: number): Observable<ServiCita> {
    return this.clientHttp.get<ServiCita>(`${this.url}/${id}`);
  }

  crearServiCita(serviCita: { idCita: number; comentario: string; valoracion: number; }): Observable<any> {
    return this.clientHttp.post<ServiCita>(this.url, serviCita, { responseType: 'text' as 'json' });
  }

  actualizarServiCita(id: number, serviCita: { idCita: number; comentario: string; valoracion: number; }): Observable<any> {
    return this.clientHttp.put<ServiCita>(`${this.url}/${id}`, serviCita, { responseType: 'text' as 'json' });
  }

  eliminarServiCita(id: number): Observable<void> {
    return this.clientHttp.delete<void>(`${this.url}/${id}`);
  }

  obtenerTopCincoValoraciones(): Observable<ServiCita[]> {
    return this.clientHttp.get<ServiCita[]>(`${this.url}/top5`);
  }

  obtenerServiCitasPorUsuario(idUsuario: number): Observable<ServiCita[]> {
    return this.clientHttp.get<ServiCita[]>(`${this.url}/usuario/${idUsuario}/valoracion`);
  }

  desactivarServiCita(id: number): Observable<void> {
    return this.clientHttp.patch<void>(`${this.url}/${id}/desactivar`, {});
  }


}
