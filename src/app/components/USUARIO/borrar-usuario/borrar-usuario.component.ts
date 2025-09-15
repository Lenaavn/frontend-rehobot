import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-borrar-usuario',
  standalone: false,
  templateUrl: './borrar-usuario.component.html',
  styleUrl: './borrar-usuario.component.css'
})
export class BorrarUsuarioComponent implements OnInit {
  usuariosLista: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios(); 
  }

  cargarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe((usuarios) => {
      this.usuariosLista = usuarios;
    });
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }
}