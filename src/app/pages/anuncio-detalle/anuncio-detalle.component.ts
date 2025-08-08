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
  anuncio: any = null;
  id!: string;
  apiUrl = environment.apiUrl;
  telefonoLimpio: string = '';


  constructor(
    private route: ActivatedRoute,
    private anunciosService: AnunciosService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
  this.anunciosService.getById(this.id).subscribe({
    next: (data) => {
      this.anuncio = data;
      this.telefonoLimpio = this.anuncio.contacto.replace(/\D/g, '');
    },
    error: (err) => console.error('Error al cargar anuncio:', err)
  });
  }
}