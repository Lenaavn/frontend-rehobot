import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private url = "https://backend-rehobot.onrender.com/rehobot/api/servicios";

  constructor(private clientHttp: HttpClient) { }

  listarServicios(): Observable<Servicio[]> {
    return this.clientHttp.get<Servicio[]>(this.url);
  }

  obtenerServicioPorId(id: number): Observable<Servicio> {
    return this.clientHttp.get<Servicio>(`${this.url}/${id}`);
  }

  crearServicio(servicio: { nombre: string; descripcion: string; precio: number }): Observable<any> {
    return this.clientHttp.post<Servicio>(this.url, servicio, { responseType: 'text' as 'json' });
  }

  actualizarServicio(id: number, servicio: { id: number; nombre: string; descripcion: string; precio: number }): Observable<any> {
    return this.clientHttp.put<Servicio>(`${this.url}/${id}`, servicio, { responseType: 'text' as 'json' });
  }

  eliminarServicio(id: number): Observable<void> {
    return this.clientHttp.delete<void>(`${this.url}/${id}`);
  }

  desactivarServicio(id: number): Observable<void> {
    return this.clientHttp.patch<void>(`${this.url}/${id}/desactivar`, {});
  }

}