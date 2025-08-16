import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class PagosService {
  private baseUrl = `${environment.apiUrl}/api/pagos`;

  constructor(private http: HttpClient) {}

  crearPago(anuncioId: string, tipoMedalla: 'bronce' | 'plata' | 'oro') {
    return this.http.post<{ init_point: string }>(
      `${this.baseUrl}/crear-pago/${anuncioId}`,
      { tipoMedalla }
    );
  }
}