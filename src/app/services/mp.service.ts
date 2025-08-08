import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MercadoPagoService {
  private apiUrl = 'http://localhost:3000/api/anuncios'; // o tu URL real

  constructor(private http: HttpClient) {}

  getMiAnuncio(): Promise<any> {
    return this.http.get(`${this.apiUrl}/mio`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).toPromise();
  }
  

  generarLinkDePagoAsync(): Promise<string> {
    const anuncioId = localStorage.getItem('anuncioId');
    if (!anuncioId) throw new Error('No hay ID de anuncio');
  
    return this.http.post<{ link: string }>(
      `http://localhost:3000/api/anuncios/crear-pago/${anuncioId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    ).toPromise().then((res) => {
        if (!res?.link) throw new Error('Respuesta sin link');
        return res.link;
      });
      
  }
  
  
}
