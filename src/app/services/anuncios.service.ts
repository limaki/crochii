import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnunciosService {
  private baseUrl = 'http://localhost:3000/api/anuncios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  
  getById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createAnuncio(formData: FormData): Observable<{ _id: string }> {
    return this.http.post<{ _id: string }>(this.baseUrl, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
  }
  
  
  updateAnuncio(id: string, formData: FormData) {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put(`${this.baseUrl}/${id}`, formData, { headers });
  }
  
  deleteAnuncio(id: string) {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
  getMisAnuncios() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/mis-anuncios`, { headers });
  }

// en anuncios.service.ts
filtrarAnuncios(filtros: any): Observable<any[]> {
  return this.http.post<any[]>(`${this.baseUrl}/filtrar`, filtros);
}

  
  
  
}