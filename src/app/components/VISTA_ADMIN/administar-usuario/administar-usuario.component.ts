import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-administar-usuario',
  standalone: false,
  templateUrl: './administar-usuario.component.html',
  styleUrl: './administar-usuario.component.css'
})
export class ADMINISTARUSUARIOComponent {
  usuarioDetalle: Usuario | null = null;

  constructor(
    private userService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = 1; // Siempre carga el usuario con ID 1
    this.obtenerUsuario(id);
  }

  private obtenerUsuario(id: number): void {
    this.userService.obtenerUsuarioPorId(id).subscribe({
      next: (usuario) => {
        this.usuarioDetalle = usuario;
      },
      error: (err) => console.error('Error al cargar usuario', err)
    });
  }

  volver(): void {
    this.router.navigate(['/desktop']);
  }

  actualizar(): void {
    this.router.navigate(['/desktop/update']);
  }

}

