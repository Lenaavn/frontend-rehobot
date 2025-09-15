import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import bcrypt from 'bcryptjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-admin',
  standalone: false,
  templateUrl: './actualizar-admin.component.html',
  styleUrl: './actualizar-admin.component.css'
})
export class ACTUALIZARADMINComponent implements OnInit {
  usuario: Partial<Usuario> = {
    id: 1, // Siempre asigna el ID 1
    nombre: '',
    email: '',
    telefono: '',
    contrasena: '',
    rol: 'USER'
  };
  usuarioAnterior: Partial<Usuario> = {}; // Se declara la variable para comparar la contraseña original
  mensajeErrorGeneral: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerUsuario(1); // Siempre obtiene el usuario con ID 1
  }

  private obtenerUsuario(id: number): void {
    this.usuarioService.obtenerUsuarioPorId(id).subscribe({
      next: (data: Usuario) => {
        this.usuario = data;
        this.usuarioAnterior = { ...data }; // Guarda la versión original para comparar la contraseña
      },
      error: () => {
        this.mensajeErrorGeneral = 'No se pudo cargar los datos del usuario.';
        this.router.navigate(['desktop/administrador']);
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
        id: 1, // Siempre usa el ID 1 en la actualización
        nombre: this.usuario.nombre!,
        email: this.usuario.email!,
        telefono: this.usuario.telefono!,
        contrasena: hashedPassword!, // Usa la misma contraseña si no se modificó
        rol: this.usuario.rol!
      };

      this.usuarioService.actualizarUsuario(1, usuarioActualizado).subscribe({
        next: () => {
          this.router.navigate(['desktop/administrador']);
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
    this.router.navigate(['desktop/administrador']);
  }
}
