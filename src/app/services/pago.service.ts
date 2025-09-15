import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  
  private apiUrl = 'http://backend-rehobot.onrender.com/rehobot/api/pagos';

  constructor(private httpClient: HttpClient) {}

  getPagos(): Observable<Pago[]> {
    return this.httpClient.get<Pago[]>(this.apiUrl);
  }

  getPagoPorId(idPago: number): Observable<Pago> {
    return this.httpClient.get<Pago>(`${this.apiUrl}/${idPago}`);
  }

  actualizarPago(idPago: number, pago: Pago): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${idPago}`, pago, { responseType: 'text' as 'json' });
  }

  pagarPago(idPago: number, nuevoMetodoPago: string): Observable<any> {
    //HttpParams para enviar nuevoMetodoPago como un RequestParam en la URL
    const params = new HttpParams().set('nuevoMetodoPago', nuevoMetodoPago);
    return this.httpClient.put(`${this.apiUrl}/${idPago}/pagar`, null, { params, responseType: 'text' as 'json' });
  }

  getPagosPorUsuario(idUsuario: number): Observable<Pago[]> {
    return this.httpClient.get<Pago[]>(`${this.apiUrl}/usuario/${idUsuario}/pays`);
  }
  
}
