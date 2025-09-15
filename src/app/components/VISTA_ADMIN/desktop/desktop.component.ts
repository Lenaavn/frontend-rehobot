import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare const lucide: any; 

@Component({
  selector: 'app-desktop',
  standalone: false,
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent implements AfterViewInit  {

  constructor(private router: Router) { }
  ngAfterViewInit(): void {
    lucide.createIcons();
  }

  usuarios(): void {
    this.router.navigate(['desktop/usuarios']);
  }

  vehiculos(): void {
    this.router.navigate(['desktop/vehiculos']);
  }

  citas(): void {
    this.router.navigate(['desktop/citas']);
  }

  servicios(): void {
    this.router.navigate(['desktop/servicios']);
  }

  pagos(): void {
    this.router.navigate(['desktop/pagos']);
  }

  servicitas(): void {
    this.router.navigate(['desktop/servicitas']);
  }

}
