import { Component, OnInit } from '@angular/core';
import { ServiCita } from '../../../models/serviCita';
import { ServiCitaService } from '../../../services/servi-cita.service';

@Component({
  selector: 'app-borrar-servi-cita',
  standalone: false,
  templateUrl: './borrar-servi-cita.component.html',
  styleUrl: './borrar-servi-cita.component.css'
})
export class BorrarServiCitaComponent implements OnInit {
  serviCitasLista: ServiCita[] = [];

  constructor(private serviCitaService: ServiCitaService) {}

  ngOnInit(): void {
    this.cargarServiCitas(); 
  }

  cargarServiCitas(): void {
    this.serviCitaService.listarServiCitas().subscribe((serviCitas) => {
      this.serviCitasLista = serviCitas;
    });
  }

  eliminarServiCita(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta valoración?')) {
      this.serviCitaService.eliminarServiCita(id).subscribe(() => {
        this.cargarServiCitas();
      });
    }
  }
}
