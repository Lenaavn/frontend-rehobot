import { Component, OnInit } from '@angular/core';
import { CitaDTO } from '../../../models/citaDTO';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-borrar-cita',
  standalone: false,
  templateUrl: './borrar-cita.component.html',
  styleUrl: './borrar-cita.component.css'
})
export class BorrarCitaComponent implements OnInit {
  citasLista: CitaDTO[] = [];

  constructor(private citaService: CitaService) { }

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citaService.listarCitas().subscribe((citas) => {
      this.citasLista = citas;
    });
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      this.citaService.eliminarCita(id).subscribe(() => {
        this.cargarCitas();
      });
    }
  }
}