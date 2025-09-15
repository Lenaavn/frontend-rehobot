import { Component } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-crear-servicio',
  standalone: false,
  templateUrl: './crear-servicio.component.html',
  styleUrl: './crear-servicio.component.css'
})
export class CrearServicioComponent {
  nombre: string = '';
  descripcion: string = '';
  precio: number | null = null;
  mensajeErrorGeneral: string = ''; // Para mostrar mensajes de error globales

  constructor(private servicioService: ServicioService, private router: Router) {}

  public crearServicio(form: NgForm): void {
    if (form.valid) {
      const nuevoServicio = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio!
      };

      this.servicioService.crearServicio(nuevoServicio).subscribe({
        next: () => {
          this.router.navigate(['desktop/servicios']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.mensajeErrorGeneral = typeof error.error === 'string' ? error.error : 'Verifica los datos proporcionados.';
          } else {
            this.mensajeErrorGeneral = 'Error inesperado. Intenta nuevamente.';
          }
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['desktop/servicios']); 
  }
}