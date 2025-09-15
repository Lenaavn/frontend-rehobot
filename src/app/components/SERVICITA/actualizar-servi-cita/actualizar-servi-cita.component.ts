import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiCita } from '../../../models/serviCita';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServiCitaService } from '../../../services/servi-cita.service';

@Component({
  selector: 'app-actualizar-servi-cita',
  standalone: false,
  templateUrl: './actualizar-servi-cita.component.html',
  styleUrl: './actualizar-servi-cita.component.css'
})
export class ActualizarServiCitaComponent implements OnInit {
  valoresPermitidos: number[] = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
  serviCita: Partial<ServiCita> = {
    id: undefined,
    idCita: undefined,
    comentario: '',
    valoracion: undefined
  };
  mensajeErrorGeneral: string = ''; // Para mostrar mensajes de error globales

  constructor(
    private serviCitaService: ServiCitaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.serviCitaService.obtenerServiCitaPorId(id).subscribe({
        next: (data: ServiCita) => {
          this.serviCita = data; // Asignar los datos recibidos del backend
        },
        error: () => {
          this.mensajeErrorGeneral = 'No se pudo cargar los datos de la valoración.';
          this.router.navigate(['desktop/servicitas']);
        }
      });
    } else {
      this.router.navigate(['desktop/servicitas']);
    }
  }

  public actualizarServiCita(form: NgForm): void {
    if (form.valid) {
      const serviCitaActualizada = {
        id: this.serviCita.id,
        idCita: this.serviCita.idCita!,
        comentario: this.serviCita.comentario!,
        valoracion: this.serviCita.valoracion!
      };

      this.serviCitaService.actualizarServiCita(serviCitaActualizada.id!, serviCitaActualizada).subscribe({
        next: () => {
          this.router.navigate(['desktop/servicitas']);
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
    this.router.navigate(['desktop/servicitas']);
  }
}
