import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = `${environment.apiUrl}/api/admin`;

  constructor(private http: HttpClient) {}

  // Dashboard (métricas)
  getDashboard() {
    return this.http.get<{ usuarios:number; anuncios:number; verificados:number; activosHoy:number }>(
      `${this.baseUrl}/dashboard`
    );
  }

  // Listado de usuarios
  getUsuarios() {
    return this.http.get<Array<{_id:string; nombre:string; apellido:string; email:string; telefono:string; role:string}>>(
      `${this.baseUrl}/usuarios`
    );
  }

  // Promover a admin
  promoverAAdmin(userId: string) {
    return this.http.put<{ ok: boolean; user: any }>(`${this.baseUrl}/promover/${userId}`, {});
  }
}
