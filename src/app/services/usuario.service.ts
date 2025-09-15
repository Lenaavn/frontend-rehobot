import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = "http://backend-rehobot.onrender.com/rehobot/api/usuarios";

  constructor(private clientHttp: HttpClient) { }

  listarUsuarios(): Observable<Usuario[]> {
    return this.clientHttp.get<Usuario[]>(this.url);
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.clientHttp.get<Usuario>(`${this.url}/${id}`);
  }

  crearUsuario(usuario: { nombre: string; email: string; telefono: string; contrasena: string }): Observable<any> {
    return this.clientHttp.post<Usuario>(`${this.url}`, usuario, { responseType: 'text' as 'json' });
  }

  actualizarUsuario(id: number, usuario: { nombre: string; email: string; telefono: string; contrasena: string; rol: string }): Observable<any> {
    return this.clientHttp.put<Usuario>(`${this.url}/${id}`, usuario, { responseType: 'text' as 'json' });
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.clientHttp.delete<void>(`${this.url}/${id}`);
  }

  actualizarContrasena(email: string, nuevaContrasena: string): Observable<any> {
    return this.clientHttp.put<any>(`${this.url}/actuContrasena?email=${email}&nuevaContrasena=${nuevaContrasena}`, null, { responseType: 'text' as 'json' });
  }

  ordenarAlfabeti(): Observable<Usuario[]> {
    return this.clientHttp.get<Usuario[]>(this.url);
  }

  desactivarServiCita(id: number): Observable<void> {
    return this.clientHttp.patch<void>(`${this.url}/${id}/desactivar`, {});
  }

}
