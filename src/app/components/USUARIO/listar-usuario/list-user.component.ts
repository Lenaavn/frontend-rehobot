import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-user',
  standalone: false,
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'telefono', 'rol', 'acciones'];  // Columnas de la tabla
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();  // Fuente de datos de Material
  usuarioAEliminar: number | null = null;
  ordenAlfabActivado: boolean = false;  // Estado inicial para el botón
  private usuariosOriginales: Usuario[] = [];  // Guarda los datos originales

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.listarTodosLosUsuarios(); // Carga los datos sin ordenarlos
  }

  private listarTodosLosUsuarios(): void {
    this.userService.listarUsuarios().subscribe((data) => {
      const activos = data.filter(u => u.activo !== false); // Solo los que no están inactivos
      this.dataSource.data = activos;
      this.usuariosOriginales = [...activos];

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public ordenarAlfabeticamente(): void {
    if (this.ordenAlfabActivado) return;  // Si ya se activó, no vuelve a ordenar

    if (this.dataSource.data.length > 0) {
      this.dataSource.data = [...this.dataSource.data].sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.ordenAlfabActivado = true;  // Se marca como activado
  }

  public resetearOrden(): void {
    this.dataSource.data = [...this.usuariosOriginales];  // Restaurar la lista original sin pedir datos
    this.ordenAlfabActivado = false;  // Reactivar el botón de ordenar
  }

  // Método para aplicar el filtro de la paginación (2, 5, 10, 50, 100)
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  volverAlInicio(): void {
    this.router.navigate(['/desktop']);
  }

  crearUnUsuario(): void {
    this.router.navigate(['/desktop/usuarios/create']);
  }

  actualizarUnUsuario(id: number): void {
    this.router.navigate([`/desktop/usuarios/${id}/update`]);
  }

  confirmarEliminacion(id: number): void {
    this.usuarioAEliminar = id;
  }

  cancelarEliminacion(): void {
    this.usuarioAEliminar = null;
  }

  eliminarUsuario(): void {
    if (this.usuarioAEliminar !== null) {
      this.userService.desactivarServiCita(this.usuarioAEliminar).subscribe(() => {
        this.listarTodosLosUsuarios();
        this.usuarioAEliminar = null;
      });
    }
  }
}