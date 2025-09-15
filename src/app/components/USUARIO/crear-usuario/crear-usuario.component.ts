import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import bcrypt from 'bcryptjs';


@Component({
  selector: 'app-crear-usuario',
  standalone: false,
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  contrasena: string = '';
  mensajeErrorGeneral: string = ''; // Para mostrar mensajes de error globales

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  public crearUsuario(form: NgForm): void {
    if (form.valid) {
      // Generar hash de la contraseña antes de enviarla
      const salt = bcrypt.genSaltSync(10); // Genera un "salt" seguro
      const hashedPassword = bcrypt.hashSync(this.contrasena, salt); // Codifica la contraseña

      const nuevoUsuario = {
        nombre: this.nombre,
        email: this.email,
        telefono: this.telefono,
        contrasena: hashedPassword // Enviar la contraseña cifrada
      };

      this.usuarioService.crearUsuario(nuevoUsuario).subscribe({
        next: () => {
          this.router.navigate(['desktop/usuarios']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.mensajeErrorGeneral = typeof error.error === 'string' ? error.error : 'Algo salió mal. Verifica los datos.';
          } else {
            this.mensajeErrorGeneral = 'Error inesperado. Intenta nuevamente.';
          }
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['desktop/usuarios']); 
  }
}