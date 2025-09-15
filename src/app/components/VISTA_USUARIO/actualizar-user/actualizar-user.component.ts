import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import bcrypt from 'bcryptjs';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-actualizar-user',
  standalone: false,
  templateUrl: './actualizar-user.component.html',
  styleUrl: './actualizar-user.component.css'
})
export class ActualizarUserComponent implements OnInit {
  usuario: Partial<Usuario> = {
    id: undefined,
    nombre: '',
    email: '',
    telefono: '',
    contrasena: '',
    rol: 'USER'
  };
  usuarioAnterior: Partial<Usuario> = {};
  mensajeErrorGeneral: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarioDesdeToken();
  }

  private obtenerUsuarioDesdeToken(): void {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      this.mensajeErrorGeneral = "No tienes sesión iniciada.";
      return;
    }

    try {
      const tokenData: any = jwtDecode(token);
      const userId = tokenData.id; // Obtenemos el ID del usuario desde el token

      if (userId) {
        this.obtenerUsuario(userId);
      } else {
        this.mensajeErrorGeneral = "Error al obtener la información del usuario.";
      }
    } catch (error) {
      this.mensajeErrorGeneral = "Token inválido.";
    }
  }

  private obtenerUsuario(id: number): void {
    this.usuarioService.obtenerUsuarioPorId(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.usuarioAnterior = { ...usuario }; // Guarda la versión original
      },
      error: () => {
        this.mensajeErrorGeneral = 'No se pudo cargar los datos del usuario.';
        this.router.navigate(['dashboard/administrador']);
      }
    });
  }

  public actualizarUsuario(form: NgForm): void {
    if (form.valid) {
      let hashedPassword = this.usuario.contrasena;

      // Solo encripta la contraseña si fue modificada por el usuario
      if (this.usuario.contrasena && this.usuario.contrasena.trim() !== '' && this.usuario.contrasena !== this.usuarioAnterior.contrasena) {
        const salt = bcrypt.genSaltSync(10);
        hashedPassword = bcrypt.hashSync(this.usuario.contrasena, salt);
      }

      const usuarioActualizado = {
        id: this.usuario.id!, 
        nombre: this.usuario.nombre!,
        email: this.usuario.email!,
        telefono: this.usuario.telefono!,
        contrasena: hashedPassword!, // Usa la misma contraseña si no se modificó
        rol: this.usuario.rol!
      };

      this.usuarioService.actualizarUsuario(usuarioActualizado.id, usuarioActualizado).subscribe({
        next: () => {
          this.router.navigate(['dashboard/administrador']);
        },
        error: (error: HttpErrorResponse) => {
          this.mensajeErrorGeneral =
            error.status === 400
              ? typeof error.error === 'string' ? error.error : 'Algo salió mal. Verifica los datos.'
              : 'Error inesperado. Intenta nuevamente.';
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['dashboard/administrador']);
  }
}