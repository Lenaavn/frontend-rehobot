import { Component } from '@angular/core';
import { Vehiculo } from '../../../../models/vehiculo';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-vehiculo',
  standalone: false,
  templateUrl: './details-vehiculo.component.html',
  styleUrl: './details-vehiculo.component.css'
})
export class DetailsVehiculoComponent {
  vehiculoDetalle: Vehiculo| null = null;

  constructor(
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerVehiculo(+id);
    }
  }

  private obtenerVehiculo(id: number): void {
    this.vehiculoService.getVehiculoPorId(id).subscribe({
      next: (vehiculo) => {
        this.vehiculoDetalle = vehiculo;
      },
      error: (err) => console.error('Error al cargar vehículo', err)
    });
  }

  volverALista(): void {
    this.router.navigate(['dashboard/vehiculos']);
  }

}

