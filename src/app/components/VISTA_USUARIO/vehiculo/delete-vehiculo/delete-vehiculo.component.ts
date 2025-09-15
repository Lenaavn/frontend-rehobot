import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../../../models/vehiculo';
import { VehiculoService } from '../../../../services/vehiculo.service';

@Component({
  selector: 'app-delete-vehiculo',
  standalone: false,
  templateUrl: './delete-vehiculo.component.html',
  styleUrl: './delete-vehiculo.component.css'
})
export class DeleteVehiculoComponent implements OnInit {
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

