import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../../../services/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  volverAlInicio(): void {
    this.router.navigate(['/']);
  }
  credenciales = {
    email: '',
    contrasena: ''
  };

  mensajeErrorGeneral: string = '';
  mensajeErrorGeneral2: string = '';
  mostrarContrasenaLogin: boolean = false;
  mostrarContrasenaRecuperacion: boolean = false;
  mostrarFormularioRecuperacion: boolean = false;
  emailRecuperacion: string = '';
  nuevaContrasenaRecuperacion: string = '';

  constructor(private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router) { }

  toggleMostrarContrasenaLogin() {
    this.mostrarContrasenaLogin = !this.mostrarContrasenaLogin;
  }

  toggleMostrarContrasenaRecuperacion() {
    this.mostrarContrasenaRecuperacion = !this.mostrarContrasenaRecuperacion;
  }

  login() {
    if (!this.credenciales.email || !this.credenciales.contrasena) {
      this.mensajeErrorGeneral = 'Todos los campos son obligatorios.';
      return;
    }

    this.authService.authenticate(this.credenciales).subscribe({
      next: (response) => {
        localStorage.setItem('jwtToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);

        const tokenData: any = jwtDecode(response.accessToken);
        const role = tokenData.rol;

        if (role === 'ADMIN') {
          this.router.navigate(['/desktop']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          const mensajeBackend = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
          this.mensajeErrorGeneral = mensajeBackend.includes('email')
            ? 'No hay un usuario registrado con ese email.'
            : mensajeBackend.includes('contraseña')
              ? 'La contraseña o el email es incorrecto. Intenta nuevamente.'
              : 'Solicitud incorrecta. Verifica los datos.';
        } else if (error.status === 401) {
          // Intentar refrescar el token si el usuario tiene un Refresh Token
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            this.authService.refreshToken().subscribe({
              next: (refreshResponse) => {
                localStorage.setItem('jwtToken', refreshResponse.accessToken);
                console.log('Token renovado exitosamente.');
              },
              error: () => {
                this.mensajeErrorGeneral = 'Sesión expirada, inicia sesión nuevamente.';
              }
            });
          } else {
            this.mensajeErrorGeneral = 'Tu sesión ha expirado. Inicia sesión nuevamente.';
          }
        } else {
          this.mensajeErrorGeneral = 'Error inesperado. Intenta nuevamente.';
        }
      }
    });
  }

  toggleFormularioRecuperacion() {
    this.mostrarFormularioRecuperacion = !this.mostrarFormularioRecuperacion;
  }

  recuperarContrasena() {
    if (!this.emailRecuperacion || !this.nuevaContrasenaRecuperacion) {
      this.mensajeErrorGeneral = 'Debes ingresar tu email y una nueva contraseña.';
      return;
    }

    this.usuarioService.actualizarContrasena(this.emailRecuperacion, this.nuevaContrasenaRecuperacion).subscribe({
      next: () => {
        this.mensajeErrorGeneral2 = 'Contraseña actualizada correctamente.';
        this.mostrarFormularioRecuperacion = false;
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          const mensajeBackend = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);

          if (mensajeBackend.includes('email')) {
            this.mensajeErrorGeneral = 'No hay un usuario registrado con ese email.';
          } else {
            this.mensajeErrorGeneral = 'Solicitud incorrecta. Verifica los datos.';
          }
        } else {
          this.mensajeErrorGeneral = 'Error inesperado. Intenta nuevamente.';
        }
      }
    });
  }
}
