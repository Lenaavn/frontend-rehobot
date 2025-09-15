import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../../models/servicio';
import { ServicioService } from '../../../services/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-servicio',
  standalone: false,
  templateUrl: './detalle-servicio.component.html',
  styleUrl: './detalle-servicio.component.css'
})
export class DetalleServicioComponent implements OnInit {
  servicioDetalle: Servicio | null = null;

  constructor(
    private servicioService: ServicioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.obtenerServicio(id);
    }
  }

  private obtenerServicio(id: number): void {
    this.servicioService.obtenerServicioPorId(id).subscribe({
      next: (servicio) => {
        this.servicioDetalle = servicio;
      }
    });
  }

  volverALista(): void {
    this.router.navigate(['desktop/servicios']);
  }
}