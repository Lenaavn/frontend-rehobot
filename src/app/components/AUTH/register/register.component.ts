import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usuario = {
    nombre: '',
    apellidos: '',
    email: '',
    contrasena: '',
    telefono: ''
  };

  contrasenaConfirmacion: string = '';
  mensajeErrorGeneral: string = '';
  mostrarContrasena: boolean = false;
  mostrarContrasenaConfirmada: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  toggleMostrarContrasenaConfirmada(): void {
    this.mostrarContrasenaConfirmada = !this.mostrarContrasenaConfirmada;
  }

  volverAlInicio(): void {
    this.router.navigate(['/login']);
  }

  register(): void {
    this.mensajeErrorGeneral = '';

    // Validación de campos obligatorios
    if (!this.usuario.nombre || !this.usuario.apellidos || !this.usuario.email || !this.usuario.contrasena || !this.usuario.telefono) {
      this.mensajeErrorGeneral = 'Todos los campos son obligatorios.';
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.usuario.contrasena !== this.contrasenaConfirmacion) {
      this.mensajeErrorGeneral = 'Las contraseñas no coinciden.';
      return;
    }

    // Enviar al backend
    this.authService.register(this.usuario).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          const mensaje = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);

          if (mensaje.includes('email')) {
            this.mensajeErrorGeneral = 'Ya existe un usuario con ese email.';
          } else if (mensaje.includes('teléfono')) {
            this.mensajeErrorGeneral = 'Ya existe un usuario con ese número de teléfono.';
          } else {
            this.mensajeErrorGeneral = 'Algo salió mal. Verifica los datos.';
          }
        } else {
          this.mensajeErrorGeneral = 'Error inesperado. Intenta nuevamente.';
        }
      }
    });
  }
}