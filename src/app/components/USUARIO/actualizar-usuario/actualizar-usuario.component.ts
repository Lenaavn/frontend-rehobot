import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import bcrypt from 'bcryptjs';

@Component({
  selector: 'app-actualizar-usuario',
  standalone: false,
  templateUrl: './actualizar-usuario.component.html',
  styleUrl: './actualizar-usuario.component.css'
})
export class ActualizarUsuarioComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.usuarioService.obtenerUsuarioPorId(Number(this.route.snapshot.paramMap.get('id'))).subscribe({
    next: (data: Usuario) => {
      this.usuario = data;
      this.usuarioAnterior = { ...data }; // Guarda la versión original
    },
    error: () => {
      this.mensajeErrorGeneral = 'No se pudo cargar los datos del usuario.';
      this.router.navigate(['desktop/usuarios']);
    }
  });
}


  public actualizarUsuario(form: NgForm): void {
  if (form.valid) {
    let hashedPassword = this.usuario.contrasena;

    // Solo encripta la contraseña si el usuario la modificó
    if (this.usuario.contrasena && this.usuario.contrasena.trim() !== '' && this.usuario.contrasena !== this.usuarioAnterior?.contrasena) {
      const salt = bcrypt.genSaltSync(10);
      hashedPassword = bcrypt.hashSync(this.usuario.contrasena, salt);
    }

    const usuarioActualizado = {
      id: this.usuario.id!,
      nombre: this.usuario.nombre!,
      email: this.usuario.email!,
      telefono: this.usuario.telefono!,
      contrasena: hashedPassword!, // Mantiene la contraseña original si no se cambia
      rol: this.usuario.rol!
    };

    this.usuarioService.actualizarUsuario(usuarioActualizado.id, usuarioActualizado).subscribe({
      next: () => {
        this.router.navigate(['desktop/usuarios']);
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
    this.router.navigate(['desktop/usuarios']);
  }
}