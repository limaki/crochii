import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthEventsService } from '../../services/auth-events.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule, RouterLink]
})
export class RegisterComponent {
  registerData = {
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    password: ''
  };

  private nextPath: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute, private authEvents: AuthEventsService
  ) {
    // Obtener el query param `next`
    this.route.queryParams.subscribe(params => {
      this.nextPath = params['next'] || null;
    });
  }

  register() {
    this.authService.register(this.registerData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userId', res.userId);
        this.authEvents.notifyAuthChanged();
  
        if (this.nextPath === 'anunciarme') {
          this.router.navigate(['/anunciarme']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: err => {
        alert('Error al registrarse');
        console.error(err);
      }
    });
  }
  
}
