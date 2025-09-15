import { Component } from '@angular/core';
import { ServiCitaService } from '../../../services/servi-cita.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-crear-servi-cita',
  standalone: false,
  templateUrl: './crear-servi-cita.component.html',
  styleUrl: './crear-servi-cita.component.css'
})
export class CrearServiCitaComponent {
  idCita!: number;
  comentario: string = '';
  valoracion!: number;
  mensajeErrorGeneral: string = ''; // Para mostrar mensajes de error globales

  constructor(private serviCitaService: ServiCitaService, private router: Router) {}

  public crearServiCita(form: NgForm): void {
    if (form.valid) {
      const nuevaServiCita = {
        idCita: this.idCita,
        comentario: this.comentario,
        valoracion: this.valoracion
      };

      this.serviCitaService.crearServiCita(nuevaServiCita).subscribe({
        next: () => {
          this.router.navigate(['/desktop/servicitas']);
        },
        error: (error: HttpErrorResponse) => {
          // Manejar errores del servidor
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
    this.router.navigate(['desktop/servicitas']);
  }
}
