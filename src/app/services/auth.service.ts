import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://backend-rehobot.onrender.com:8080/rehobot/api/auth';

  constructor(private http: HttpClient) { }

  /* Registro de usuarios */
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  /* Autenticación */
  authenticate(credentials: any): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(`${this.apiUrl}/authenticate`, credentials);
  }

  /* Renovación del Token */
  refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No se encontró Refresh Token.');
    }

    return this.http.post<{ accessToken: string; refreshToken: string }>(`${this.apiUrl}/refresh`, { refreshToken });
  }

  /* Obtener el ID del usuario desde el token */
  getUserId(): number | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const token = window.localStorage.getItem('jwtToken');
        if (!token) return null;

        const tokenData: any = jwtDecode(token);
        return tokenData.id || null;
      }
    } catch (error) {
      console.error('Error obteniendo el ID del usuario:', error);
    }
    return null;
  }

  /* Obtener rol del usuario desde el token almacenado */
  getUserRole(): string {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const token = window.localStorage.getItem('jwtToken');
        if (!token) return '';

        const tokenData: any = jwtDecode(token);
        return tokenData.rol || '';
      }
    } catch (error) {
      console.error('Error accediendo a localStorage:', error);
    }
    return '';
  }

  /* Verificar si el usuario está autenticado */
  isAuthenticated(): boolean {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return !!window.localStorage.getItem('jwtToken');
      }
    } catch (error) {
      console.error('Error accediendo a localStorage:', error);
    }
    return false;
  }
  
}