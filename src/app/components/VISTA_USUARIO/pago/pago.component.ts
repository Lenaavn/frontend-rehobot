import { Component, OnInit, ViewChild } from '@angular/core';
import { Pago } from '../../../models/pago';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PagoService } from '../../../services/pago.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-pago',
  standalone: false,
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent implements OnInit {
  displayedColumns: string[] = ['idCita', 'monto', 'metodoPago'];
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource<Pago>();
  pagoAActualizar: number | null = null;
  private pagosOriginales: Pago[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pagoService: PagoService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const idUsuario = decodedToken.id;

      this.listarTodosLosPagos(idUsuario);
    }
  }

  private listarTodosLosPagos(idUsuario: number): void {
    this.pagoService.getPagosPorUsuario(idUsuario).subscribe((data) => {

      this.dataSource.data = data;
      this.pagosOriginales = [...data];

      // Asignación del paginador y ordenamiento
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