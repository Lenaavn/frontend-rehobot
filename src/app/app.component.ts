import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'rehobot_front';
  headerType: string = 'default'; // 'default', 'user', 'admin'

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateUserStatus();

    // Detecta cambios de ruta para mostrar el header
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderType(event.url);
      }
    });
  }

  updateUserStatus() {
    const isLoggedIn = this.authService.isAuthenticated();
    const userRole = this.authService.getUserRole();

    if (!isLoggedIn) {
      this.headerType = 'default';
    } else if (userRole === 'ADMIN') {
      this.headerType = 'admin';
    } else {
      this.headerType = 'user';
    }
  }

  updateHeaderType(url: string) {
    if (url.includes('/desktop')) {
      this.headerType = 'admin';
    } else if (url.includes('/dashboard')) {
      this.headerType = 'user';
    } else {
      this.headerType = 'default';
    }
  }
}
