import { Component, OnInit, ViewChild } from '@angular/core';
import { Vehiculo } from '../../../models/vehiculo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VehiculoService } from '../../../services/vehiculo.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-vehiculo',
  standalone: false,
  templateUrl: './vehiculo.component.html',
  styleUrl: './vehiculo.component.css'
})
export class VehiculoComponent implements OnInit {
  displayedColumns: string[] = ['matricula', 'marca', 'modelo', 'acciones'];
  dataSource: MatTableDataSource<Vehiculo> = new MatTableDataSource<Vehiculo>();
  vehiculoAEliminar: number | null = null;
  usuarioId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuarioId = this.authService.getUserId();
    if (this.usuarioId !== null) {
      this.listarVehiculosDelUsuario();
    } else {
      console.error('Usuario no autenticado.');
    }
  }

  private listarVehiculosDelUsuario(): void {
    this.vehiculoService.getVehiculosPorUsuario(this.usuarioId!).subscribe((data) => {
      const activos = data.filter(u => u.activo !== false);
      this.dataSource.data = activos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource._updateChangeSubscription(); // Forzar actualización de la tabla
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  volverAlInicio(): void {
    this.router.navigate(['/dashboard']);
  }

  crearVehiculo(): void {
    this.router.navigate(['/dashboard/vehiculos/create']);
  }

  detalleVehiculo(id: number): void {
    this.router.navigate([`/dashboard/vehiculos/${id}/details`]);
  }

  actualizarVehiculo(id: number): void {
    this.router.navigate([`/dashboard/vehiculos/${id}/update`]);
  }

  confirmarEliminacion(id: number): void {
    this.vehiculoAEliminar = id;
  }

  cancelarEliminacion(): void {
    this.vehiculoAEliminar = null;
  }

  eliminarVehiculo(): void {
    if (this.vehiculoAEliminar !== null) {
      this.vehiculoService.desactivarVehiculo(this.vehiculoAEliminar).subscribe(() => {
        this.listarVehiculosDelUsuario(); // Recargar lista después de eliminar
        this.vehiculoAEliminar = null; // Resetear la variable después de eliminar
      });
    }
  }
}