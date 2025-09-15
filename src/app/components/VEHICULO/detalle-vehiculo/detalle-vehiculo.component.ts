import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from '../../../models/vehiculo';
import { VehiculoService } from '../../../services/vehiculo.service';

@Component({
  selector: 'app-detalle-vehiculo',
  standalone: false,
  templateUrl: './detalle-vehiculo.component.html',
  styleUrl: './detalle-vehiculo.component.css'
})
export class DetalleVehiculoComponent {
  vehiculoDetalle: Vehiculo | null = null;

  constructor(
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
    this.router.navigate(['desktop/vehiculos']); 
  }

}

