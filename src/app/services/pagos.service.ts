import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PagosService {
  private baseUrl = 'http://localhost:3000/api/pagos';

  constructor(private http: HttpClient) {}

  crearPago(anuncioId: string, tipoMedalla: 'bronce' | 'plata' | 'oro') {
    return this.http.post<{ init_point: string }>(
      `${this.baseUrl}/crear-pago/${anuncioId}`,
      { tipoMedalla }
    );
  }
}