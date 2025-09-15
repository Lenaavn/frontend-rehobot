import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiCita } from '../../../models/serviCita';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServiCitaService } from '../../../services/servi-cita.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-valoracion',
  standalone: false,
  templateUrl: './valoracion.component.html',
  styleUrl: './valoracion.component.css'
})
export class ValoracionComponent implements OnInit {
  displayedColumns: string[] = ['usuario', 'servicio', 'comentario', 'valoracion'];
  dataSource: MatTableDataSource<ServiCita> = new MatTableDataSource<ServiCita>();
  serviCitaAEliminar: number | null = null;
  private serviCitasOriginales: ServiCita[] = [];
  public mostrandoTopValoraciones: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private serviCitaService: ServiCitaService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const idUsuario = decodedToken.id;

      this.listarTodasLasServiCitas(idUsuario);
    }
  }

  private listarTodasLasServiCitas(idUsuario: number): void {
    this.serviCitaService.obtenerServiCitasPorUsuario(idUsuario).subscribe((data) => {
      const activas = data.filter(sc => sc.activo !== false);
      this.dataSource.data = activas;
      this.serviCitasOriginales = [...activas];

      // Asignación de paginador y ordenación después de cargar datos
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  volverAlInicio(): void {
    this.router.navigate(['/dashboard']);
  }
}

