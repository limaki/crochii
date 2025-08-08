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
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, NgClass, TitleCasePipe, RouterLink],
  templateUrl: './mis-anuncios.component.html',
  styleUrl: './mis-anuncios.component.css'
})
export class MisAnunciosComponent {

  anuncios: any[] = [];
  loading = true;
  apiUrl = environment.apiUrl;

  constructor(private anunciosService: AnunciosService, router : Router) {}

  ngOnInit(): void {
    this.anunciosService.getMisAnuncios().subscribe({
      next: (res: any) => {
        this.anuncios = res;
        this.loading = false;
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
