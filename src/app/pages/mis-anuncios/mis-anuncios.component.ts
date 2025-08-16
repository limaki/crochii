import { Component } from '@angular/core';
import { AnunciosService } from '../../services/anuncios.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-mis-anuncios',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, NgClass, TitleCasePipe, RouterLink, ],
  templateUrl: './mis-anuncios.component.html',
  styleUrl: './mis-anuncios.component.css'
})
export class MisAnunciosComponent {

  anuncios: any[] = [];
  loading = true;
  apiUrl = environment.apiUrl;
  verificado: boolean = false;

  constructor(private anunciosService: AnunciosService, router : Router) {}

  ngOnInit(): void {
    this.anunciosService.getMisAnuncios().subscribe({
      next: (res: any) => {
        this.anuncios = res;
        this.loading = false;
  
        // ✅ Guardar estado verificado del primer anuncio (si existe)
        if (res && typeof res.verificado === 'boolean') {
          localStorage.setItem('verificado', String(res.verificado));
        }
      },
      error: err => {
        console.error('Error cargando anuncios', err);
        this.loading = false;
      }
    });


    this.anunciosService.getMisAnuncios().subscribe({
      next: (res: any) => {
        this.anuncios = res;
        this.loading = false;
  
        // ✅ Si viene como array, tomamos el primer anuncio
        if (Array.isArray(res) && res.length > 0 && typeof res[0].verificado === 'boolean') {
          localStorage.setItem('verificado', String(res[0].verificado));
          this.verificado = res[0].verificado;
        } 
        // ✅ Si viene como objeto (por si cambias endpoint)
        else if (res && typeof res.verificado === 'boolean') {
          localStorage.setItem('verificado', String(res.verificado));
          this.verificado = res.verificado;
        }
      },
      error: err => {
        console.error('Error cargando anuncios', err);
        this.loading = false;
      }
    });
  }
  

  eliminarAnuncio(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este anuncio?')) {
      this.anunciosService.deleteAnuncio(id).subscribe({
        next: () => {
          this.anuncios = this.anuncios.filter(a => a._id !== id);
        },
        error: err => alert('Error al eliminar: ' + err.message)
      });
    }
  }
  


}
