import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServiCita } from '../../../models/serviCita';
import { ServiCitaService } from '../../../services/servi-cita.service';
import { register } from 'swiper/element/bundle';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  usuarioNombre: string = 'Invitado';
  topValoraciones: ServiCita[] = [];

  constructor(private router: Router, private serviCitaService: ServiCitaService) {}

  ngOnInit() {
    register(); // Inicializa Swiper correctamente

    this.obtenerNombreDesdeToken();

    this.serviCitaService.obtenerTopCincoValoraciones().subscribe(data => {
      this.topValoraciones = data;
    });
  }

  // Extraer nombre del usuario directamente desde el token en `localStorage`
  obtenerNombreDesdeToken() {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error("Token no encontrado en localStorage.");
      return;
    }

    try {
      const tokenData: any = jwtDecode(token);
      this.usuarioNombre = tokenData.nombre || 'Invitado';
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      this.usuarioNombre = 'Invitado';
    }
  }

  // Métodos de navegación
  irVehiculo(): void {
    this.router.navigate(['/dashboard/vehiculos']);
  }

  irCitas(): void {
    this.router.navigate(['/dashboard/citas']);
  }

  irPagos(): void {
    this.router.navigate(['/dashboard/pagos']);
  }

  irValoraciones(): void {
    this.router.navigate(['/dashboard/valoraciones']);
  }
}