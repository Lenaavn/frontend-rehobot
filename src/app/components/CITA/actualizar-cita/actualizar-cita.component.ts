import { Component, OnInit } from '@angular/core';
import { CitaDTO, Estado } from '../../../models/citaDTO';
import { LocalDate, LocalTime } from '@js-joda/core';
import { CitaService } from '../../../services/cita.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-cita',
  standalone: false,
  templateUrl: './actualizar-cita.component.html',
  styleUrl: './actualizar-cita.component.css'
})
export class ActualizarCitaComponent implements OnInit {
  cita: Partial<CitaDTO> = {
    id: undefined,
    idVehiculo: undefined,
    idServicio: undefined,
    idPago: undefined,
    fecha: undefined,
    hora: undefined,
    estado: undefined
  };
  mensajeErrorGeneral: string = ''; // Para mostrar mensajes de error globales

  estadosDisponibles: Estado[] = ['PAGADA', 'NO_PAGADA'];

  constructor(
    private citaService: CitaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.citaService.obtenerCitaPorId(id).subscribe({
        next: (data: CitaDTO) => {
          this.cita = data; // Asignar los datos recibidos del backend
        },
        error: () => {
          this.mensajeErrorGeneral = 'No se pudo cargar los datos de la cita.';
          this.router.navigate(['desktop/citas']);
        }
      });
    } else {
      this.router.navigate(['desktop/citas']);
    }
  }

  public actualizarCita(form: NgForm): void {
    if (form.valid) {
      if (this.cita.estado === 'PAGADA') {
        this.mensajeErrorGeneral = "No se puede actualizar una cita que ya ha sido pagada.";
        return;
      }

      const citaActualizada = {
        id: this.cita.id!,
        idVehiculo: this.cita.idVehiculo!,
        idServicio: this.cita.idServicio!,
        idPago: this.cita.idPago!,
        fecha: this.cita.fecha!,
        hora: this.cita.hora!,
        estado: this.cita.estado!
      };

      this.citaService.actualizarCita(citaActualizada.id!, citaActualizada).subscribe({
        next: () => {
          this.router.navigate(['desktop/citas']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            if (typeof error.error === 'string') {
              this.mensajeErrorGeneral = error.error; // Mostrar mensaje del backend
            } else {
              this.mensajeErrorGeneral = 'Algo salió mal. Por favor, verifica los datos proporcionados.';
            }
          } else {
            this.mensajeErrorGeneral = 'Error inesperado. Intenta nuevamente.';
          }
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['desktop/citas']);
  }
}