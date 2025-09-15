import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-create-vehiculo',
  standalone: false,
  templateUrl: './create-vehiculo.component.html',
  styleUrl: './create-vehiculo.component.css'
})
export class CreateVehiculoComponent implements OnInit {
  idUsuario: number | null = null;
  marca: string = '';
  modelo: string = '';
  matricula: string = '';
  mensajeErrorGeneral: string = '';

  constructor(private vehiculoService: VehiculoService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.idUsuario = this.authService.getUserId();
  }

  public crearVehiculo(form: NgForm): void {
    if (form.valid) {
      const nuevoVehiculo = { idUsuario: this.idUsuario!, marca: this.marca, modelo: this.modelo, matricula: this.matricula };
      this.vehiculoService.crearVehiculo(nuevoVehiculo).subscribe({
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

