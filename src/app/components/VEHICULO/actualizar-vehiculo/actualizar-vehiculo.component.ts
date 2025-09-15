import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../../models/vehiculo';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-actualizar-vehiculo',
  standalone: false,
  templateUrl: './actualizar-vehiculo.component.html',
  styleUrl: './actualizar-vehiculo.component.css'
})
export class ActualizarVehiculoComponent implements OnInit {
  vehiculo: Partial<Vehiculo> = {
    id: undefined,
    idUsuario: undefined,
    marca: '',
    modelo: '',
    matricula: ''
  };

  mensajeErrorGeneral: string = ''; // Para mostrar mensajes de error globales

  constructor(
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.vehiculoService.getVehiculoPorId(id).subscribe({
        next: (data: Vehiculo) => {
          this.vehiculo = data; // Asignar los datos recibidos a la propiedad vehiculo
        },
        error: () => {
          this.mensajeErrorGeneral = 'No se pudo cargar los datos del vehículo.';
          this.router.navigate(['desktop/vehiculos']);
        }
      });
    } else {
      this.router.navigate(['desktop/vehiculos']);
    }
  }

  public actualizarVehiculo(form: NgForm): void {
    if (form.valid) {
      const vehiculoActualizado = {
        id: this.vehiculo.id!,
        idUsuario: this.vehiculo.idUsuario!,
        marca: this.vehiculo.marca!,
        modelo: this.vehiculo.modelo!,
        matricula: this.vehiculo.matricula!
      };

      this.vehiculoService.actualizarVehiculo(vehiculoActualizado.id, vehiculoActualizado).subscribe({
        next: () => {
          this.router.navigate(['desktop/vehiculos']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            if (typeof error.error === 'string') {
              this.mensajeErrorGeneral = error.error; // Mostrar mensaje enviado por el backend
            } else {
              this.mensajeErrorGeneral = 'Algo salió mal. Por favor, verifica los datos.';
            }
          } else {
            this.mensajeErrorGeneral = 'Error inesperado. Intenta nuevamente.';
          }
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['desktop/vehiculos']);
  }
}

