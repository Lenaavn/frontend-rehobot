import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../models/vehiculo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private apiUrl = 'https://backend-rehobot.onrender.com/rehobot/api/vehiculos';

  constructor(private clientHttp: HttpClient) { }

  getVehiculos(): Observable<Vehiculo[]> {
    return this.clientHttp.get<Vehiculo[]>(this.apiUrl);
  }

  eliminarVehiculo(id: number): Observable<void> {
    return this.clientHttp.delete<void>(`${this.apiUrl}/${id}`);
  }

  crearVehiculo(vehiculo: { idUsuario: number; marca: string; modelo: string; matricula: string }): Observable<any> {
    return this.clientHttp.post(this.apiUrl, vehiculo, { responseType: 'text' as 'json' });
  }

  getVehiculoPorId(id: number): Observable<Vehiculo> {
    return this.clientHttp.get<Vehiculo>(`${this.apiUrl}/${id}`);
  }

  getVehiculosPorUsuario(idUsuario: number): Observable<Vehiculo[]> {
    return this.clientHttp.get<Vehiculo[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  actualizarVehiculo(id: number, vehiculo: { idUsuario: number; marca: string; modelo: string; matricula: string }): Observable<any> {
    return this.clientHttp.put<Vehiculo>(`${this.apiUrl}/${id}`, vehiculo, { responseType: 'text' as 'json' });
  }

  desactivarVehiculo(id: number): Observable<void> {
    return this.clientHttp.patch<void>(`${this.apiUrl}/${id}/desactivar`, {});
  }

}
