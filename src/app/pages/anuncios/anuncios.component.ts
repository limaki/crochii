import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnunciosService } from '../../services/anuncios.service';
import { FiltrosService } from '../../services/filtros.services';
import { environment } from '../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

type PageItem = number | '…';

@Component({
  selector: 'app-anuncios',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, TitleCasePipe, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {
  perfiles: any[] = [];
  apiUrl = environment.apiUrl;

  // PAGINADO
  currentPage = 1;
  readonly pageSize = 10;

  constructor(
    private anunciosService: AnunciosService,
    private filtrosService: FiltrosService
  ) {}

  ngOnInit(): void {
    // Escucha cambios en filtros
    this.filtrosService.filtros$.subscribe(filtros => {
      if (Object.keys(filtros).length === 0) {
        this.cargarTodos();
      } else {
        this.anunciosService.filtrarAnuncios(filtros).subscribe({
          next: (res: any[]) => {
            this.perfiles = res ?? [];
            this.currentPage = 1; // reset paginación al cambiar dataset
          },
          error: (err) => console.error('Error al filtrar anuncios:', err)
        });
      }
    });

    // Carga inicial
    this.cargarTodos();
  }

  cargarTodos() {
    this.anunciosService.getAll().subscribe({
      next: (res: any[]) => {
        this.perfiles = res ?? [];
        this.currentPage = 1; // reset al cargar todo
      },
      error: (err) => console.error('Error al cargar anuncios:', err)
    });
  }

  // ===== PAGINADO =====
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.perfiles.length / this.pageSize));
  }

  // Lista paginada
  get paginatedPerfiles() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = Math.min(start + this.pageSize, this.perfiles.length);
    return this.perfiles.slice(start, end);
  }

  // Índices mostrados (para “Mostrando X–Y de Z”)
  get startItemIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }
  get endItemIndex() {
    return Math.min(this.startItemIndex + this.pageSize, this.perfiles.length);
  }

  // Navegación
  nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
  prevPage() { if (this.currentPage > 1) this.currentPage--; }

  // Acepta '…' pero lo ignora, así no falla el template
  goToPage(p: PageItem) {
    if (p === '…') return;
    if (p >= 1 && p <= this.totalPages) this.currentPage = p;
  }

  // Páginas visibles con elipsis (máx 7)
  get visiblePages(): PageItem[] {
    const total = this.totalPages;
    const cur = this.currentPage;

    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1) as number[];

    const pages: PageItem[] = [1];
    const left = Math.max(2, cur - 1);
    const right = Math.min(total - 1, cur + 1);

    if (left > 2) pages.push('…');
    for (let p = left; p <= right; p++) pages.push(p);
    if (right < total - 1) pages.push('…');

    pages.push(total);
    return pages;
  }

  // Si cambiás el tamaño de página desde el <select>
  onPageSizeChange() {
    this.currentPage = 1; // vuelve al inicio
  }

  // trackBy para rendimiento
  trackById(_: number, item: any) { return item._id ?? item.id; }
}
