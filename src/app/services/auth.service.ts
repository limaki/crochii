import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';


  

@Injectable({ providedIn: 'root' })
export class AuthService {
private baseUrl = `${environment.apiUrl}/api/usuarios`;
  constructor(private http: HttpClient) {}

  register(data: {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  
  

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => {
        const token = res.token;
        localStorage.setItem('token', token);

        // 🔍 Decodificamos el payload del JWT
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;
        const userId = payload.id;

        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
