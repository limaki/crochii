import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthEventsService } from '../../services/auth-events.service';





@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {

  loginData = {
    email: '',
    password: ''
  };


  constructor(private authService: AuthService, private router: Router, private authEvents: AuthEventsService) {}

  login() {
    const normalizedData = {
      email: this.loginData.email.trim().toLowerCase(),
      password: this.loginData.password
    };

    this.authService.login(normalizedData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userId', res.userId);
        this.authEvents.notifyAuthChanged();

        if (res.anuncioId) {
          localStorage.setItem('anuncioId', res.anuncioId);
        }

        if (res.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }

        console.log(res.role); // ya no necesitás parsear desde localStorage acá
      },
      error: (err) => {
        alert('Credenciales inválidas');
        console.error(err);
      }
    });
  }
  



}
