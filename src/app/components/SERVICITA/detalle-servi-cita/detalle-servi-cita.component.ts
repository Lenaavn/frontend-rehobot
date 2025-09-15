import { Component } from '@angular/core';
import { ServiCita } from '../../../models/serviCita';
import { ServiCitaService } from '../../../services/servi-cita.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-servi-cita',
  standalone: false,
  templateUrl: './detalle-servi-cita.component.html',
  styleUrl: './detalle-servi-cita.component.css'
})
export class DetalleServiCitaComponent {
  serviCitaDetalle: ServiCita | null = null;

  constructor(
    private serviCitaService: ServiCitaService,
    private route: ActivatedRoute,
    private router: Router // Se añadió el Router aquí
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerServiCita(+id);
    }
  }

  private obtenerServiCita(id: number): void {
    this.serviCitaService.obtenerServiCitaPorId(id).subscribe({
      next: (serviCita) => {
        this.serviCitaDetalle = serviCita;
      },
      error: (err) => console.error('Error al cargar la valoración', err)
    });
  }

  volverALista(): void {
    this.router.navigate(['desktop/servicitas']);
  }

}
