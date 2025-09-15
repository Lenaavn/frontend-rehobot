import { Component, OnInit } from '@angular/core';
import { CitaDTO } from '../../../models/citaDTO';
import { CitaService } from '../../../services/cita.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-cita',
  standalone: false,
  templateUrl: './detalle-cita.component.html',
  styleUrl: './detalle-cita.component.css'
})
export class DetalleCitaComponent implements OnInit {
  citaDetalle: CitaDTO | null = null;

  constructor(
    private citaService: CitaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerCita(+id);
    }
  }

  private obtenerCita(id: number): void {
    this.citaService.obtenerCitaPorId(id).subscribe({
      next: (cita) => {
        this.citaDetalle = cita;
      },
      error: (err) => console.error('Error al cargar cita', err)
    });
  }

  volverALista(): void {
    this.router.navigate(['desktop/citas']);
  }
}
