import { Component } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  standalone: false,
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  mostrarPersonMenu = false;
  mostrarMenu = false;
  mostrarSombra = false; 

  togglePersonMenu() {
    this.mostrarPersonMenu = !this.mostrarPersonMenu;
    this.mostrarMenu = false;
    this.mostrarSombra = this.mostrarPersonMenu || this.mostrarMenu; 
  }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
    this.mostrarPersonMenu = false;
    this.mostrarSombra = this.mostrarPersonMenu || this.mostrarMenu; 
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    window.location.href = "/"; 
  }
}
