import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CitaDTO } from '../../../models/citaDTO';
import { CitaService } from '../../../services/cita.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-cita',
  standalone: false,
  templateUrl: './listar-cita.component.html',
  styleUrl: './listar-cita.component.css'
})
export class ListarCitaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombreUsuario', 'fecha', 'hora', 'estado', 'acciones'];
  dataSource: MatTableDataSource<CitaDTO> = new MatTableDataSource<CitaDTO>();
  citaAEliminar: number | null = null;
  mostrarCitasPagadas: boolean = true;
  private citasOriginales: CitaDTO[] = [];
  public filtrandoPagadas: boolean = false;
  public filtrandoNoPagadas: boolean = false;
  public filtrandoHoy: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private citaService: CitaService, private router: Router) { }

  ngOnInit(): void {
    this.listarTodasLasCitas();
  }

  private listarTodasLasCitas(): void {
    this.citaService.listarCitas().subscribe((data) => {
      // Ordenar por fecha y hora descendente
      const citasOrdenadas = data.sort((a, b) => {
        const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
        const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
        return fechaHoraB.getTime() - fechaHoraA.getTime();
      });

      this.dataSource.data = citasOrdenadas;
      this.citasOriginales = [...citasOrdenadas];

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

  public filtrarCitasHoy(): void {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    this.citaService.listarCitas().subscribe(data => {
      this.dataSource.data = data.filter(cita => {
        const fechaCita = new Date(cita.fecha);
        fechaCita.setHours(0, 0, 0, 0);
        return fechaCita.getTime() === hoy.getTime();
      });
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.filtrandoHoy = true;
    this.filtrandoPagadas = false;
    this.filtrandoNoPagadas = false;
  }

  public filtrarCitasPagadas(): void {
    if (this.filtrandoPagadas) return;

    this.citaService.listarCitasPagadas().subscribe(data => {
      this.dataSource.data = data;
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.filtrandoPagadas = true;
    this.filtrandoHoy = false;
    this.filtrandoNoPagadas = false;
  }

  public filtrarCitasNoPagadas(): void {
    if (this.filtrandoNoPagadas) return;

    this.citaService.listarCitasNoPagadas().subscribe(data => {
      this.dataSource.data = data;
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.filtrandoNoPagadas = true;
    this.filtrandoHoy = false;
    this.filtrandoPagadas = false;
  }

  public resetearFiltro(): void {
    this.listarTodasLasCitas(); // Recarga la lista original sin filtrar
    this.filtrandoPagadas = false;
    this.filtrandoNoPagadas = false;
    this.filtrandoHoy = false;
  }

  citaCercana(fecha: string, hora: string): boolean {
    const citaFechaHora = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    const diferenciaMs = citaFechaHora.getTime() - ahora.getTime();
    const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);
    return diferenciaHoras < 2;
  }

  volverAlInicio(): void {
    this.router.navigate(['/desktop']);
  }

  crearUnaCita(): void {
    this.router.navigate(['/desktop/citas/create']);
  }

  actualizarUnaCita(id: number): void {
    this.router.navigate([`/desktop/citas/${id}/update`]);
  }

  confirmarEliminacion(id: number): void {
    this.citaAEliminar = id;
  }

  cancelarEliminacion(): void {
    this.citaAEliminar = null;
  }

  eliminarCita(): void {
    if (this.citaAEliminar !== null) {
      this.citaService.eliminarCita(this.citaAEliminar).subscribe(() => {
        this.listarTodasLasCitas();
        this.citaAEliminar = null;
      });
    }
  }
}