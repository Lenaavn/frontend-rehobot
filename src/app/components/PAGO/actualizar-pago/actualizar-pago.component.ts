import { Component, OnInit } from '@angular/core';
import { Pago } from '../../../models/pago';
import { PagoService } from '../../../services/pago.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-pago',
  standalone: false,
  templateUrl: './actualizar-pago.component.html',
  styleUrl: './actualizar-pago.component.css'
})
export class ActualizarPagoComponent implements OnInit {
  pago: Pago | null = null;
  mensajeErrorGeneral: string = '';
  esEditable: boolean = false;

  constructor(
    private pagoService: PagoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idPago = Number(this.route.snapshot.paramMap.get('idPago'));
    if (idPago) {
      this.pagoService.getPagoPorId(idPago).subscribe({
        next: (data: Pago) => {
          this.pago = data;
          this.esEditable = data.metodoPago !== 'SIN_DETERMINAR'; // Permitir edición solo si el método de pago no es SIN_DETERMINAR
        },
        error: () => {
          this.mensajeErrorGeneral = 'No se pudo cargar los datos del pago.';
          this.router.navigate(['desktop/pagos']);
        }
      });
    } else {
      this.router.navigate(['desktop/pagos']);
    }
  }

  public actualizarPago(form: NgForm): void {
    if (form.valid && this.pago && this.esEditable) {
      const pagoActualizado: Pago = {
        id: this.pago.id!,
        idCita: this.pago.idCita!,
        monto: this.pago.monto!,
        metodoPago: this.pago.metodoPago!
      };

      this.pagoService.actualizarPago(pagoActualizado.id, pagoActualizado).subscribe({
        next: () => {
          this.router.navigate(['desktop/pagos']);
        },
        error: (error: HttpErrorResponse) => {
          this.mensajeErrorGeneral = error.status === 400
            ? (typeof error.error === 'string' ? error.error : 'Error al actualizar el método de pago.')
            : 'Error inesperado. Intenta nuevamente.';
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['desktop/pagos']);
  }
}
