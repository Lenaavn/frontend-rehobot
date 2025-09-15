import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Servicio } from '../../../models/servicio';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-actualizar-servicio',
  standalone: false,
  templateUrl: './actualizar-servicio.component.html',
  styleUrl: './actualizar-servicio.component.css'
})
export class ActualizarServicioComponent implements OnInit {
  servicio: Partial<Servicio> = {
    id: 0, 
    nombre: undefined, 
    descripcion: '',
    precio: 0
  };
  mensajeErrorGeneral: string = ''; // Para mostrar mensajes de error globales

  constructor(
    private servicioService: ServicioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.servicioService.obtenerServicioPorId(id).subscribe({
        next: (data: Servicio) => {
          this.servicio = { ...data }; // Asegurar que id es un número
        },
        error: () => {
          this.mensajeErrorGeneral = 'No se pudo cargar los datos del servicio.';
          this.router.navigate(['desktop/servicios']);
        }
      });
    } else {
      this.router.navigate(['desktop/servicios']);
    }
  }

  public actualizarServicio(form: NgForm): void {
    if (form.valid && this.servicio.id !== undefined) { // Evita id indefinido
      const servicioActualizado: Servicio = {
        id: this.servicio.id, // Ya garantizado como número
        nombre: this.servicio.nombre!,
        descripcion: this.servicio.descripcion!,
        precio: this.servicio.precio!
      };

      this.servicioService.actualizarServicio(servicioActualizado.id, servicioActualizado).subscribe({
        next: () => {
          this.router.navigate(['desktop/servicios']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.mensajeErrorGeneral = typeof error.error === 'string' ? error.error : 'Algo salió mal. Verifica los datos proporcionados.';
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