import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../../services/vehiculo.service';
import { Vehiculo } from '../../../models/vehiculo';

@Component({
  selector: 'app-borrar-vehiculo',
  standalone: false,
  templateUrl: './borrar-vehiculo.component.html',
  styleUrls: ['./borrar-vehiculo.component.css']
})
export class BorrarVehiculoComponent implements OnInit {
  vehiculosLista: Vehiculo[] = [];

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe((vehiculos) => {
      this.vehiculosLista = vehiculos;
    });
  }

  eliminarVehiculo(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
      this.vehiculoService.eliminarVehiculo(id).subscribe(() => {
        this.cargarVehiculos();
      });
    }
  }
}
