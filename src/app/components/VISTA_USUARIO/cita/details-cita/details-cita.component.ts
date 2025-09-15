import { Component, OnInit } from '@angular/core';
import { CitaDTO } from '../../../../models/citaDTO';
import { CitaService } from '../../../../services/cita.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-cita',
  standalone: false,
  templateUrl: './details-cita.component.html',
  styleUrl: './details-cita.component.css'
})
export class DetailsCitaComponent implements OnInit {
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
    this.router.navigate(['dashboard/citas']);
  }
}