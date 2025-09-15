import { Component, OnInit } from '@angular/core';
import { Pago } from '../../../models/pago';
import { PagoService } from '../../../services/pago.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-pago',
  standalone: false,
  templateUrl: './detalle-pago.component.html',
  styleUrl: './detalle-pago.component.css'
})
export class DetallePagoComponent implements OnInit {
  pagoDetalle: Pago | null = null;

  constructor(
    private pagoService: PagoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idPago = this.route.snapshot.paramMap.get('idPago');
    if (idPago) {
      this.obtenerPago(+idPago);
    }
  }

  private obtenerPago(idPago: number): void {
    this.pagoService.getPagoPorId(idPago).subscribe({
      next: (pago) => {
        this.pagoDetalle = pago;
      },
      error: (err) => console.error('Error al cargar pago', err)
    });
  }

  volverALista(): void {
    this.router.navigate(['desktop/pagos']);
  }
}
