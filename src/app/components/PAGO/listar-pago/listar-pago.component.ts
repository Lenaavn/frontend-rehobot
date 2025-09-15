import { Component, OnInit, ViewChild } from '@angular/core';
import { Pago } from '../../../models/pago';
import { PagoService } from '../../../services/pago.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-pago',
  standalone: false,
  templateUrl: './listar-pago.component.html',
  styleUrl: './listar-pago.component.css'
})
export class ListPagoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'idCita', 'monto', 'metodoPago', 'acciones'];
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource<Pago>();
  pagoAActualizar: number | null = null;
  private pagosOriginales: Pago[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pagoService: PagoService, private router: Router) {}

  ngOnInit(): void {
    this.listarTodosLosPagos();
  }

  private listarTodosLosPagos(): void {
    this.pagoService.getPagos().subscribe((data) => {

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
    this.router.navigate(['/desktop']);
  }

  actualizarUnPago(idPago: number): void {
    this.router.navigate([`/desktop/pagos/${idPago}/update`]);
  }

  confirmarActualizacion(idPago: number): void {
    this.pagoAActualizar = idPago;
  }

  cancelarActualizacion(): void {
    this.pagoAActualizar = null;
  }

  actualizarMetodoPago(idPago: number, nuevoMetodoPago: string): void {
    if (this.pagoAActualizar !== null) {
      this.pagoService.pagarPago(idPago, nuevoMetodoPago).subscribe(() => {
        this.listarTodosLosPagos();
        this.pagoAActualizar = null;
      });
    }
  }
}