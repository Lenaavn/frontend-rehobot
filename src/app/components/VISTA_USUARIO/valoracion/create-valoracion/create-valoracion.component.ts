import { Component, OnInit } from '@angular/core';
import { ServiCitaService } from '../../../../services/servi-cita.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-valoracion',
  standalone: false,
  templateUrl: './create-valoracion.component.html',
  styleUrl: './create-valoracion.component.css'
})
export class CreateValoracionComponent implements OnInit {
  idCita!: number;
  comentario: string = '';
  valoracion!: number;
  mensajeErrorGeneral: string = '';

  constructor(private serviCitaService: ServiCitaService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idCita = Number(this.route.snapshot.paramMap.get('idCita')); // Obtener ID de la cita desde la URL
  }

  public crearServiCita(form: NgForm): void {
    if (form.valid) {
      const nuevaServiCita = {
        idCita: this.idCita, // ID prellenado
        comentario: this.comentario,
        valoracion: this.valoracion
      };

      this.serviCitaService.crearServiCita(nuevaServiCita).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/citas']);
        },
        error: (error) => {
          this.mensajeErrorGeneral = error.status === 400 ? error.error : 'Error inesperado.';
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/dashboard/citas']);
  }
}
