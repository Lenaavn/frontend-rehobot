import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-administrar-user',
  standalone: false,
  templateUrl: './administrar-user.component.html',
  styleUrl: './administrar-user.component.css'
})
export class AdministrarUserComponent implements OnInit {
  usuarioDetalle: Usuario | null = null;

  constructor(
    private userService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarioDesdeToken();
  }

  private obtenerUsuarioDesdeToken(): void {
    const token = localStorage.getItem('jwtToken'); 

    if (!token) {
      console.error("Token no encontrado en localStorage.");
      return;
    }

    try {
      const tokenData: any = jwtDecode(token);
      const userId = tokenData.id; // Obtenemos el ID del usuario desde el token

      if (userId) {
        this.obtenerUsuario(userId);
      } else {
        console.error('No se encontró el ID en el token.');
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }

  private obtenerUsuario(id: number): void {
    this.userService.obtenerUsuarioPorId(id).subscribe({
      next: (usuario) => {
        this.usuarioDetalle = usuario;
      },
      error: (err) => console.error('Error al cargar usuario:', err)
    });
  }

  volver(): void {
    this.router.navigate(['/dashboard']);
  }

  actualizar(): void {
    this.router.navigate(['/dashboard/update']);
  }
}