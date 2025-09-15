import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiCita } from '../../../models/serviCita';
import { ServiCitaService } from '../../../services/servi-cita.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-servi-cita',
  standalone: false,
  templateUrl: './listar-servi-cita.component.html',
  styleUrl: './listar-servi-cita.component.css'
})
export class ListarServiCitaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'servicio', 'usuario', 'comentario', 'valoracion', 'acciones'];
  dataSource: MatTableDataSource<ServiCita> = new MatTableDataSource<ServiCita>();
  serviCitaAEliminar: number | null = null;
  mostrandoTopValoraciones: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private serviCitaService: ServiCitaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarTodasLasServiCitas();
  }

  private listarTodasLasServiCitas(): void {
    this.serviCitaService.listarServiCitas().subscribe((data) => {
      const activas = data.filter(sc => sc.activo !== false);
      this.dataSource.data = activas;

      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort!;
    });
  }

  public filtrarTopCincoValoraciones(): void {
    if (this.mostrandoTopValoraciones) return;

    this.serviCitaService.obtenerTopCincoValoraciones().subscribe(data => {
      const activas = data.filter(sc => sc.activo !== false);
      this.dataSource.data = activas;

      this.dataSource.paginator = this.paginator!;
      this.dataSource.paginator?.firstPage();
      this.mostrandoTopValoraciones = true;
    });
  }

  public resetearFiltro(): void {
    this.listarTodasLasServiCitas();
    this.mostrandoTopValoraciones = false;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.paginator?.firstPage();
  }

  volverAlInicio(): void {
    this.router.navigate(['/desktop']);
  }

  crearUnaServiCita(): void {
    this.router.navigate(['/desktop/servicitas/create']);
  }

  actualizarUnaServiCita(id: number): void {
    this.router.navigate([`/desktop/servicitas/${id}/update`]);
  }

  confirmarEliminacion(id: number): void {
    this.serviCitaAEliminar = id;
  }

  cancelarEliminacion(): void {
    this.serviCitaAEliminar = null;
  }

  eliminarServiCita(): void {
    if (this.serviCitaAEliminar !== null) {
      this.serviCitaService.desactivarServiCita(this.serviCitaAEliminar).subscribe(() => {
        this.listarTodasLasServiCitas();
        this.serviCitaAEliminar = null;
      });
    }
  }
}