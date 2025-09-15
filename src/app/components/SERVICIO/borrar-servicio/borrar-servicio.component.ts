import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../../models/servicio';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-borrar-servicio',
  standalone: false,
  templateUrl: './borrar-servicio.component.html',
  styleUrl: './borrar-servicio.component.css'
})
export class BorrarServicioComponent implements OnInit {
  serviciosLista: Servicio[] = [];

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.servicioService.listarServicios().subscribe((servicios) => {
      this.serviciosLista = servicios;
    });
  }

  eliminarServicio(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.servicioService.eliminarServicio(id).subscribe(() => {
        this.cargarServicios();
      });
    }
  }
}
