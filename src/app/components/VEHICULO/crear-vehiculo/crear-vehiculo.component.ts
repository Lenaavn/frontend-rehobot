import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { VehiculoService } from '../../../services/vehiculo.service';
import { Vehiculo } from '../../../models/vehiculo';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-crear-vehiculo',
  standalone: false,
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.css']
})
export class CrearVehiculoComponent implements OnInit {
  usuarios: Usuario[] = [];
  idUsuario: number | null = null;
  marca: string = '';
  modelo: string = '';
  matricula: string = '';
  mensajeErrorGeneral: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private vehiculoService: VehiculoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: () => {
        this.mensajeErrorGeneral = 'Error al cargar los usuarios.';
      }
    });
  }

  crearVehiculo(form: NgForm): void {
    if (form.valid && this.idUsuario !== null) {
      this.matricula = this.matricula.toUpperCase();
      
      const nuevoVehiculo = {
        idUsuario: this.idUsuario,
        marca: this.marca,
        modelo: this.modelo,
        matricula: this.matricula
      };

      this.vehiculoService.crearVehiculo(nuevoVehiculo).subscribe({
        next: () => {
          this.router.navigate(['desktop/vehiculos']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.mensajeErrorGeneral = typeof error.error === 'string' ? error.error : 'Algo salió mal. Verifica los datos.';
          } else {
            this.mensajeErrorGeneral = 'Error inesperado. Intenta nuevamente.';
          }
        }
      });
    } else {
      this.mensajeErrorGeneral = 'Debe seleccionar un usuario antes de crear el vehículo.';
    }
  }

  volver(): void {
    this.router.navigate(['desktop/vehiculos']);
  }
}