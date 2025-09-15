import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../../../models/vehiculo';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-vehiculo',
  standalone: false,
  templateUrl: './update-vehiculo.component.html',
  styleUrl: './update-vehiculo.component.css'
})
export class UpdateVehiculoComponent implements OnInit {
  vehiculo: Partial<Vehiculo> = {
    id: undefined,
    idUsuario: undefined,
    marca: '',
    modelo: '',
    matricula: ''
  };

  mensajeErrorGeneral: string = '';

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
          this.router.navigate(['dashboard/vehiculos']);
        }
      });
    } else {
      this.router.navigate(['dashboard/vehiculos']);
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
          this.router.navigate(['dashboard/vehiculos']);
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
    this.router.navigate(['dashboard/vehiculos']);
  }
}
