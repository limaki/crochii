import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';
import { AnunciosService } from '../../services/anuncios.service';
import { FiltrosService } from '../../services/filtros.services';
import {  NgFor } from '@angular/common';
import { AuthEventsService } from '../../services/auth-events.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { NgStyle } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, RouterLink, NgClass, NgStyle, DatePipe, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy  {
  modalAbierto = false;
  estaLogueado = false;
  esAdmin = false;
  tieneAnuncioId = false;
  provinciaSeleccionada = '';
  provincias: string[] = [];
  private sub?: Subscription;
  mobileOpen = false;

  anuncios: any[] = [];
  loading = true;

  verificado: boolean = false;

  zonasPorProvincia : { [key: string]: string[] } = { 
  
  "Santa Cruz": [
    "Caleta Olivia",
    "Puerto Deseado",
    "Pico Truncado",
    "Las Heras",
    "Puerto San Julián",
    "Los Antiguos",
    "Perito Moreno",
    "Puerto Santa Cruz",
    "Cmte. Luis Piedra Buena",
    "Gobernador Gregores",
    "El Calafate",
    "El Chaltén",
    "Río Turbio",
    "28 de Noviembre"
  ],
  "Chubut": [
    "Comodoro Rivadavia",
    "Esquel",
    "Gaiman",
    "Puerto Madryn",
    "Rada Tilly",
    "Rawson",
    "Sarmiento",
    "Trelew",
    "Dolavon",
    "El Maitén",
    "Gobernador Costa",
    "Lago Puelo",
    "Playa Unión",
    "Río Mayo",
    "Trevelin"
  ],
  "Tierra del Fuego": [
    "Río Grande",
    "Ushuaia",
    "Tolhuin"
  ],
  "Córdoba": [
    "Córdoba capital",
    "Río Cuarto",
    "Villa María",
    "Villa Carlos Paz",
    "Alta Gracia",
    "Colonia Caroya",
    "Cruz del Eje",
    "Villa Dolores",
    "San Francisco",
    "Santa María de Punilla",
    "Jesús María",
    "Villa Allende",
    "Anisacate",
    "La Falda",
    "Río Tercero",
    "Brinkmann",
    "Capilla del Monte",
    "Bell Ville",
    "Villa Giardino"
  ],
  "Capital Federal": [
    "San Nicolás",
    "Recoleta",
    "Palermo",
    "Caballito",
    "Villa Devoto",
    "Montserrat",
    "Balvanera",
    "Belgrano",
    "Villa Crespo",
    "Retiro",
    "Constitución",
    "Villa Urquiza",
    "Almagro",
    "Flores",
    "Liniers",
    "Villa del Parque",
    "San Cristóbal",
    "Puerto Madero",
    "Barracas",
    "Mataderos"
  ],
  "Buenos Aires": [
    "Mar del Plata",
    "La Plata",
    "Bahía Blanca",
    "Pilar",
    "San Francisco Solano",
    "Belén de Escobar",
    "Glew",
    "Tortuguitas",
    "Paso del Rey",
    "Las Malvinas",
    "Bosques",
    "Luján",
    "Cañuelas",
    "San Antonio de Padua",
    "Campana",
    "Zárate",
    "Monte Chingolo",
    "Ingeniero Maschwitz",
    "Necochea",
    "Alberti"
  ],
  "Santa Fe": [
    "Rosario",
    "Santa Fe capital",
    "Santo Tomé",
    "Venado Tuerto",
    "Rafaela",
    "Reconquista",
    "San Lorenzo",
    "Fray Luis Beltrán",
    "Esperanza",
    "Puerto General San Martín",
    "Zenón Pereyra",
    "Rufino",
    "Cafferata",
    "Arroyo Seco",
    "Funes",
    "Armstrong",
    "Casilda",
    "Humboldt",
    "Timbúes"
  ],
  "Mendoza": [
    "Mendoza capital",
    "Guaymallén",
    "San José",
    "San Rafael",
    "Godoy Cruz",
    "Las Heras",
    "San Martín",
    "Luján de Cuyo",
    "Maipú",
    "Tunuyán",
    "Tupungato",
    "Eugenio Bustos",
    "La Consulta",
    "Villa Atuel"
  ],
  "Gran Buenos Aires": [
    "Quilmes",
    "Morón",
    "Florencio Varela",
    "San Miguel",
    "Avellaneda",
    "Tigre",
    "Lanús",
    "Lomas de Zamora",
    "Ramos Mejía",
    "Temperley",
    "Merlo",
    "San Fernando",
    "General San Martín",
    "Berazategui",
    "La Matanza",
    "Benavídez",
    "Hurlingham",
    "José Clemente Paz",
    "Monte Grande",
    "Ezpeleta"
  ],
  "Chaco": [
    "Resistencia",
    "Presidencia Roque Sáenz Peña",
    "Fontana",
    "Barranqueras",
    "Villa Ángela",
    "Quitilipi",
    "Charata",
    "Juan José Castelli",
    "Campo Largo",
    "Villa Berthet",
    "Concepción del Bermejo",
    "Las Palmas",
    "San Bernardo",
    "Basail",
    "Colonia Benítez",
    "Miraflores"
  ],
  "Jujuy": [
    "San Salvador de Jujuy",
    "San Pedro de Jujuy",
    "Perico",
    "Palpalá",
    "El Carmen",
    "Monterrico",
    "Libertador General San Martín",
    "La Quiaca",
    "Humahuaca",
    "Abra Pampa",
    "Chalicán",
    "Puesto Viejo"
  ],
  "Salta": [
    "Salta capital",
    "Tartagal",
    "San José de Metán",
    "General Güemes",
    "Rosario de Lerma",
    "San Ramón de la Nueva Orán",
    "Rosario de la Frontera",
    "Vaqueros",
    "Cafayate",
    "Yacuy",
    "General Enrique Mosconi",
    "Aguas Blancas"
  ],
  "Corrientes": [
    "Corrientes capital",
    "Goya",
    "Paso de los Libres",
    "Bella Vista",
    "Monte Caseros",
    "Empedrado",
    "Mercedes",
    "Itá Ibaté",
    "Paso de la Patria",
    "San Luis del Palmar",
    "Mburucuyá",
    "Itatí",
    "Ituzaingó",
    "Gobernador Juan E. Martínez",
    "San Miguel",
    "San Roque",
    "Santa Lucía"
  ],
  "Entre Ríos": [
    "Paraná",
    "Concepción del Uruguay",
    "Concordia",
    "Colón",
    "Gualeguaychú",
    "Chajarí",
    "Victoria",
    "Rosario del Tala",
    "Gualeguay",
    "Aranguren",
    "Diamante",
    "San José",
    "Villaguay",
    "Basavilbaso",
    "Crespo",
    "Villa Elisa",
    "Nogoyá",
    "Federal",
    "Federación",
    "Hasenkamp"
  ],
  "Tucumán": [
    "San Miguel de Tucumán",
    "Yerba Buena",
    "Concepción",
    "Lules",
    "Banda del Río Salí",
    "Alderetes",
    "Aguilares",
    "Acheral",
    "Tafí Viejo",
    "Monteros",
    "Juan Bautista Alberdi",
    "La Cocha"
  ],
  "San Luis": [
    "San Luis capital",
    "Villa Mercedes",
    "Merlo",
    "Juana Koslay",
    "Unión",
    "La Toma",
    "Villa General Roca",
    "Justo Daract"
  ]
}


  constructor(
    private authState: AuthStateService,
    private anunciosService: AnunciosService,
    private filtrosService: FiltrosService,
    private cdr: ChangeDetectorRef,
    private authEvents: AuthEventsService,
  ) {}

  ngOnInit() {
    this.authState.authStatus$.subscribe(status => {
      this.estaLogueado = !!localStorage.getItem('token');
      const role = localStorage.getItem('role');
      this.esAdmin = this.estaLogueado && role === 'admin';
      const id = localStorage.getItem('anuncioId');
      this.tieneAnuncioId = !!id; // true si existe
  
      this.sub = this.authEvents.authChanged$.subscribe(() => {
        this.estaLogueado = !!localStorage.getItem('token');
        const role = localStorage.getItem('role');
        this.esAdmin = this.estaLogueado && role === 'admin';
        const id = localStorage.getItem('anuncioId');
        this.tieneAnuncioId = !!id; // true si existe
        this.cdr.markForCheck();
      });
    });
  
    this.provincias = Object.keys(this.zonasPorProvincia);
  
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
  }
  
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }



toggleMobile() { this.mobileOpen = !this.mobileOpen; }
closeMobile() { this.mobileOpen = false; }

  filtros = {
    provincia: '',
    alias: '',
    genero: '',
    etnia: '',
    zona : '',
    edadMin: null,
    edadMax: null,
    medalla: '',
    verificado: false, 
    atencion : ''
  };



  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  aplicarFiltros() {
    const filtros = {
      alias: this.filtros.alias?.trim() || '',
      genero: this.filtros.genero || '',
      etnia: this.filtros.etnia || '',
      zona: typeof this.filtros.zona === 'string' ? this.filtros.zona.trim() : '',
      edadMin: this.filtros.edadMin || null,
      edadMax: this.filtros.edadMax || null,
      medalla: this.filtros.medalla || '',
      verificado: this.filtros.verificado === true, 
      atencion: this.filtros.atencion || '',
      provincia: this.provinciaSeleccionada || ''
    };

    if (filtros.verificado) {
      filtros.medalla = ''; 
    }

    this.filtrosService.aplicarFiltros(filtros);
    this.cerrarModal();
  }






}

