import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagoService } from '../../../services/pago.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pagar-pago',
  standalone: false,
  templateUrl: './pagar-pago.component.html',
  styleUrl: './pagar-pago.component.css'
})
export class PagarPagoComponent implements OnInit {
  idPago: number | null = null;
  mensajeErrorGeneral: string = '';

  constructor(private route: ActivatedRoute, private pagoService: PagoService, private router: Router) { }

  ngOnInit(): void {
    this.idPago = Number(this.route.snapshot.paramMap.get('idPago'));
  }

  actualizarMetodoPago(nuevoMetodoPago: string): void {
    if (this.idPago) {
      this.pagoService.pagarPago(this.idPago, nuevoMetodoPago).subscribe({
        next: () => {
          this.router.navigate(['desktop/citas']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            if (typeof error.error === 'string') {
              this.mensajeErrorGeneral = error.error; // Mensaje personalizado del backend
            } else {
              this.mensajeErrorGeneral = 'Algo salió mal. Por favor, verifica los datos proporcionados.';
            }
          } else {
            this.mensajeErrorGeneral = 'Error inesperado. Intenta nuevamente.';
          }
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['desktop/citas']);
  }
}