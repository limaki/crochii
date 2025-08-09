import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthEventsService } from '../../services/auth-events.service';
import { AnunciosService } from '../../services/anuncios.service'; // 👈 importa el servicio

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private anunciosService: AnunciosService,   // 👈 inyecta
    private router: Router,
    private authEvents: AuthEventsService
  ) {}

  login() {
    const normalizedData = {
      email: this.loginData.email.trim().toLowerCase(),
      password: this.loginData.password
    };

    this.authService.login(normalizedData).subscribe({
      next: (res) => {
        // Guarda sesión
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('userId', res.userId);

        // ❌ NO tomamos anuncioId del login (puede no venir / era incorrecto)
        localStorage.removeItem('anuncioId');

        // 🔎 Trae tus anuncios y guarda el primero (o el que prefieras)
        this.anunciosService.getMisAnuncios().subscribe({
          next: (data: any) => {
            // Soporta respuesta como array o {anuncios: []}
            const lista = Array.isArray(data) ? data : (data?.anuncios ?? []);
            const primero = lista?.[0];

            if (primero?._id) {
              localStorage.setItem('anuncioId', primero._id);
            } else {
              localStorage.removeItem('anuncioId');
            }

            // Notifica login y navega
            (this.authEvents as any).notifyAuthChange?.(true);
            (this.authEvents as any).notifyAuthChanged?.(); // por si tu método se llama así
            this.router.navigate([res.role === 'admin' ? '/admin' : '/']);
          },
          error: () => {
            // Si falla cargar anuncios, seguimos igual
            localStorage.removeItem('anuncioId');
            (this.authEvents as any).notifyAuthChange?.(true);
            (this.authEvents as any).notifyAuthChanged?.();
            this.router.navigate([res.role === 'admin' ? '/admin' : '/']);
          }
        });
      },
      error: (err) => {
        alert('Credenciales inválidas');
        console.error(err);
      }
    });
  }
}
