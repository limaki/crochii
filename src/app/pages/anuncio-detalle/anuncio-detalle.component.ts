import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnunciosService } from '../../services/anuncios.service';
import { NgIf } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-anuncio-detalle',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './anuncio-detalle.component.html',
  styleUrls: ['./anuncio-detalle.component.css']
})
export class AnuncioDetalleComponent implements OnInit {
  apiUrl = environment.apiUrl;
  loading = true;
  anuncio: any;

  // Galería
  fotos: string[] = [];
  fotoPrincipal = '';
  fotosRestantes: string[] = [];

  // Lightbox
  lightboxAbierto = false;
  lightboxSrc = '';

  telefonoLimpio = '';

  constructor(private route: ActivatedRoute, private svc: AnunciosService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.svc.getById(id).subscribe({
      next: (a) => {
        this.anuncio = a;
        this.telefonoLimpio = this.anuncio.contacto.replace(/\D/g, '');
        this.prepararFotos(a);
        this.loading = false;
      },
      error: (e) => { console.error(e); this.loading = false; }
    });
  }

  trackByIndex(index: number, _item: any) { return index; }


  private prepararFotos(a: any) {
    const base = Array.isArray(a?.fotos) && a.fotos.length ? a.fotos : (a?.foto ? [a.foto] : []);
    // Absolutizamos URLs
    this.fotos = base
      .map((f: string) => {
        if (!f) return '';
        if (f.startsWith('http')) return f;
        if (f.startsWith('/')) return `${this.apiUrl}${f}`;
        return `${this.apiUrl}/api/images/${f}`;
      })
      .filter(Boolean);

    // Principal + resto
    this.fotoPrincipal = this.fotos[0] || 'assets/placeholder.jpg';
    this.fotosRestantes = this.fotos.slice(1);
  }

  abrirLightbox(src: string) {
    this.lightboxSrc = src;
    this.lightboxAbierto = true;
    document.body.style.overflow = 'hidden';
  }
  cerrarLightbox() {
    this.lightboxAbierto = false;
    this.lightboxSrc = '';
    document.body.style.overflow = '';
  }

  onImgErrorLista(i: number) {
    if (this.fotosRestantes[i] && !this.fotosRestantes[i].includes('assets/placeholder')) {
      this.fotosRestantes[i] = 'assets/placeholder.jpg';
    }
  }
  onImgErrorPrincipal() {
    if (!this.fotoPrincipal.includes('assets/placeholder')) {
      this.fotoPrincipal = 'assets/placeholder.jpg';
    }
  }
}