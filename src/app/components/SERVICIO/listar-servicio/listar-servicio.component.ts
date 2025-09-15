import { Component, OnInit, ViewChild } from '@angular/core';
import { Servicio } from '../../../models/servicio';
import { ServicioService } from '../../../services/servicio.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Pago } from '../../../models/pago';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-listar-servicio',
  standalone: false,
  templateUrl: './listar-servicio.component.html',
  styleUrl: './listar-servicio.component.css'
})
export class ListServicioComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'acciones'];
  dataSource: MatTableDataSource<Servicio> = new MatTableDataSource<Servicio>();
  servicioAEliminar: number | null = null;
  private serviciosOriginales: Servicio[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private servicioService: ServicioService, private router: Router) {}

  ngOnInit(): void {
    this.listarTodosLosServicios();
  }

  private listarTodosLosServicios(): void {
    this.servicioService.listarServicios().subscribe((data) => {
      const activos = data.filter(u => u.activo !== false);
      this.dataSource.data = activos;
      this.serviciosOriginales = [...activos];

      // Asignación de paginador y ordenamiento después de cargar datos
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

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

  crearUnServicio(): void {
    this.router.navigate(['/desktop/servicios/create']);
  }

  actualizarUnServicio(id: number): void {
    this.router.navigate([`/desktop/servicios/${id}/update`]);
  }

  confirmarEliminacion(id: number): void {
    this.servicioAEliminar = id;
  }

  cancelarEliminacion(): void {
    this.servicioAEliminar = null;
  }

  eliminarServicio(): void {
    if (this.servicioAEliminar !== null) {
      this.servicioService.desactivarServicio(this.servicioAEliminar).subscribe(() => {
        this.listarTodosLosServicios();
        this.servicioAEliminar = null;
      });
    }
  }
}