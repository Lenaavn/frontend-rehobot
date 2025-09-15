import { Component, OnInit, ViewChild } from '@angular/core';
import { CitaDTO } from '../../../models/citaDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CitaService } from '../../../services/cita.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cita',
  standalone: false,
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css'
})
export class CitaComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'hora', 'estado', 'acciones'];
  dataSource: MatTableDataSource<CitaDTO> = new MatTableDataSource<CitaDTO>();
  citaAEliminar: number | null = null;
  usuarioId: number | null = null;
  private citasOriginales: CitaDTO[] = [];
  public filtrandoPagadas: boolean = false;
  public filtrandoNoPagadas: boolean = false;
  public filtrandoHoy: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private citaService: CitaService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.usuarioId = this.authService.getUserId();
    if (this.usuarioId !== null) {
      this.listarCitasDelUsuario();
    } else {
      console.error('Usuario no autenticado.');
    }
  }

  private listarCitasDelUsuario(): void {
    this.citaService.listarCitasPorUsuario(this.usuarioId!).subscribe((data) => {
      // Ordenar por fecha y hora descendente (de más reciente a más antigua)
      const citasOrdenadas = data.sort((a, b) => {
        const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
        const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
        return fechaHoraB.getTime() - fechaHoraA.getTime(); // orden descendente
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

    this.dataSource.data = this.citasOriginales.filter(cita => cita.estado === 'PAGADA');

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.filtrandoPagadas = true;
    this.filtrandoNoPagadas = false;
    this.filtrandoHoy = false;
  }

  public filtrarCitasNoPagadas(): void {
    if (this.filtrandoNoPagadas) return;

    this.dataSource.data = this.citasOriginales.filter(cita => cita.estado === 'NO_PAGADA');

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.filtrandoNoPagadas = true;
    this.filtrandoPagadas = false;
  }

  public resetearFiltro(): void {
    this.listarCitasDelUsuario();
    this.filtrandoPagadas = false;
    this.filtrandoNoPagadas = false;
    this.filtrandoHoy = false;
  }

  citaCercana(fecha: string, hora: string): boolean {
    const fechaCita = new Date(fecha + ' ' + hora);
    const ahora = new Date();
    const diferenciaMs = fechaCita.getTime() - ahora.getTime();
    const diferenciaHoras = diferenciaMs / (1000 * 60 * 60); // Convertir milisegundos a horas

    return diferenciaHoras < 2; // Si faltan menos de 2 horas, devuelve true
  }

  volverAlInicio(): void {
    this.router.navigate(['/dashboard']);
  }

  valorarCita(idCita: number): void {
    this.router.navigate([`/dashboard/citas/valoraciones/create/${idCita}`]);
  }

  crearUnaCita(): void {
    this.router.navigate(['/dashboard/citas/create']);
  }

  detalleCita(id: number): void {
    this.router.navigate([`/dashboard/citas/${id}/details`]);
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
        this.listarCitasDelUsuario();
        this.citaAEliminar = null;
      });
    }
  }
}

