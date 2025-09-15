import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiculoService } from '../../../services/vehiculo.service';
import { Vehiculo } from '../../../models/vehiculo';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-vehiculo',
  standalone: false,
  templateUrl: './list-vehiculo.component.html',
  styleUrls: ['./list-vehiculo.component.css']
})
export class ListVehiculoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'matricula', 'marca', 'modelo', 'acciones'];
  dataSource: MatTableDataSource<Vehiculo> = new MatTableDataSource<Vehiculo>();
  vehiculoAEliminar: number | null = null;
  ordenAlfabActivado: boolean = false;
  private vehiculosOriginales: Vehiculo[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private vehiculoService: VehiculoService, private router: Router) {}

  ngOnInit(): void {
    this.listarTodosLosVehiculos();
  }

  private listarTodosLosVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe((data) => {
      const activos = data.filter(u => u.activo !== false);
      this.dataSource.data = activos;
      this.vehiculosOriginales = [...activos];

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ordenarAlfabeticamente(): void {
    if (this.ordenAlfabActivado) return;

    this.dataSource.data = [...this.dataSource.data].sort((a, b) =>
      a.matricula.localeCompare(b.matricula)
    );

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.ordenAlfabActivado = true;
  }

  resetearOrden(): void {
    this.dataSource.data = [...this.vehiculosOriginales];
    this.ordenAlfabActivado = false;
  }

  volverAlInicio(): void {
    this.router.navigate(['/desktop']);
  }

  crearVehiculo(): void {
    this.router.navigate(['/desktop/vehiculos/create']);
  }

  actualizarVehiculo(id: number): void {
    this.router.navigate([`/desktop/vehiculos/${id}/update`]);
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
        this.listarTodosLosVehiculos();
        this.vehiculoAEliminar = null;
      });
    }
  }
}
