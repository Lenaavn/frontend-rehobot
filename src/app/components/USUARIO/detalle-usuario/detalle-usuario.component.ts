import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Se añadió Router aquí
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-detalle-usuario',
  standalone: false,
  templateUrl: './detalle-usuario.component.html',
  styleUrl: './detalle-usuario.component.css'
})
export class DetalleUsuarioComponent {
  usuarioDetalle: Usuario | null = null;

  constructor(
    private userService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router // Se añadió el Router aquí
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerUsuario(+id);
    }
  }

  private obtenerUsuario(id: number): void {
    this.userService.obtenerUsuarioPorId(id).subscribe({
      next: (usuario) => {
        this.usuarioDetalle = usuario;
      },
      error: (err) => console.error('Error al cargar usuario', err)
    });
  }

  volverALista(): void {
    this.router.navigate(['desktop/usuarios']); 
  }

}
