import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnunciosService } from '../../services/anuncios.service';
import { FiltrosService } from '../../services/filtros.services';
import { environment } from '../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

type PageItem = number | '…';

@Component({
  selector: 'app-anuncios',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit, OnDestroy {
  perfiles: any[] = [];
  apiUrl = environment.apiUrl; // ej: http://localhost:3000
  loading = true;

  anuncios: any[] = [];
  verificado = false;

  // Carrusel
  currentSlide: Record<string, number> = {};
  private timers: Record<string, any> = {};
  autoIntervalMs = 3500;

  // Paginado
  currentPage = 1;
  readonly pageSize = 10;

  // Swipe táctil
  private touchStartX: number | null = null;

  constructor(
    private anunciosService: AnunciosService,
    private filtrosService: FiltrosService
  ) {}

  ngOnInit(): void {
    // Filtros
    this.filtrosService.filtros$.subscribe(filtros => {
      if (Object.keys(filtros).length === 0) {
        this.cargarTodos();
      } else {
        this.anunciosService.filtrarAnuncios(filtros).subscribe({
          next: (res: any[]) => {
            this.perfiles = this.normalizePerfiles(res ?? []);
            this.currentPage = 1;
            this.initSlides(this.perfiles);
            this.initAutoForAll();
          },
          error: (err) => console.error('Error al filtrar anuncios:', err)
        });
      }
    });

    // Info del usuario (no afecta fotos)
    this.anunciosService.getMisAnuncios().subscribe({
      next: (res: any) => {
        this.anuncios = res;
        this.loading = false;
        if (Array.isArray(res) && res.length > 0 && typeof res[0].verificado === 'boolean') {
          localStorage.setItem('verificado', String(res[0].verificado));
          this.verificado = res[0].verificado;
        } else if (res && typeof res.verificado === 'boolean') {
          localStorage.setItem('verificado', String(res.verificado));
          this.verificado = res.verificado;
        }
      },
      error: err => {
        console.error('Error cargando anuncios', err);
        this.loading = false;
      }
    });

    // Carga inicial
    this.cargarTodos();
  }

  ngOnDestroy(): void {
    this.clearAllTimers();
  }

  /** Normaliza cada anuncio para que SIEMPRE tenga fotos: string[] con URLs absolutas */
  private normalizePerfiles(items: any[]): any[] {
    return (items ?? []).map((p: any) => {
      const base: string[] = Array.isArray(p.fotos) && p.fotos.length > 0
        ? p.fotos
        : (p.foto ? [p.foto] : []);

      const fotos = base
        .map((f: string) => {
          if (!f) return '';
          if (f.startsWith('http://') || f.startsWith('https://')) return f;
          if (f.startsWith('/')) return `${this.apiUrl}${f}`;
          return `${this.apiUrl}/api/images/${f}`;
        })
        .filter(Boolean);

      return { ...p, fotos };
    });
  }

  private initSlides(items: any[]) {
    for (const p of items) {
      if (!this.currentSlide[p._id]) this.currentSlide[p._id] = 0;
    }
  }

  // ====== Autoplay por tarjeta ======
  private clearAllTimers() {
    Object.keys(this.timers).forEach(id => this.stopAuto(id));
  }
  startAuto(id: string, total: number) {
    this.stopAuto(id);
    if (!total || total <= 1) return;
    this.timers[id] = setInterval(() => this.nextSlide(id, total), this.autoIntervalMs);
  }
  stopAuto(id: string) {
    if (this.timers[id]) { clearInterval(this.timers[id]); delete this.timers[id]; }
  }
  resetAuto(id: string, total: number) {
    this.startAuto(id, total);
  }
  private initAutoForAll() {
    this.clearAllTimers();
    this.perfiles.forEach(p => this.startAuto(p._id, p.fotos?.length || 0));
  }

  // ====== Navegación carrusel ======
  nextSlide(id: string, total: number) {
    const i = this.currentSlide[id] ?? 0;
    this.currentSlide[id] = (i + 1) % Math.max(1, total);
  }
  prevSlide(id: string, total: number) {
    const i = this.currentSlide[id] ?? 0;
    this.currentSlide[id] = (i - 1 + Math.max(1, total)) % Math.max(1, total);
  }
  goToSlide(id: string, idx: number) {
    this.currentSlide[id] = idx;
  }

  // Swipe táctil
  onTouchStart(e: TouchEvent) { this.touchStartX = e.touches[0].clientX; }
  onTouchEnd(id: string, total: number, e: TouchEvent) {
    if (this.touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    this.touchStartX = null;
    const SWIPE = 40;
    if (dx > SWIPE) this.prevSlide(id, total);
    else if (dx < -SWIPE) this.nextSlide(id, total);
    this.resetAuto(id, total);
  }

  // ====== Cargar todo ======
  cargarTodos() {
    this.anunciosService.getAll().subscribe({
      next: (res: any[]) => {
        this.loading = false;
        this.perfiles = this.normalizePerfiles(res ?? []);
        this.currentPage = 1;
        this.initSlides(this.perfiles);
        this.initAutoForAll();
      },
      error: (err) => { console.error('Error al cargar anuncios:', err); this.loading = false; }
    });
  }
  onImgError(perfilId: string, idx: number) {
    const p = this.perfiles.find(x => x._id === perfilId);
    if (!p) return;
    // evita loop de error si el placeholder también falla
    if (!p.fotos[idx] || p.fotos[idx].includes('assets/placeholder')) return;
    p.fotos[idx] = 'assets/placeholder.jpg';
  }
  

  // ====== Paginado ======
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.perfiles.length / this.pageSize));
  }
  get paginatedPerfiles() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = Math.min(start + this.pageSize, this.perfiles.length);
    return this.perfiles.slice(start, end);
  }
  get startItemIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }
  get endItemIndex() {
    return Math.min(this.startItemIndex + this.pageSize, this.perfiles.length);
  }
  nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
  prevPage() { if (this.currentPage > 1) this.currentPage--; }
  goToPage(p: PageItem) {
    if (p === '…') return;
    if (p >= 1 && p <= this.totalPages) this.currentPage = p;
  }
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
  onPageSizeChange() { this.currentPage = 1; }
  trackById(_: number, item: any) { return item._id ?? item.id; }
}
