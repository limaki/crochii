import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnunciosService } from '../../services/anuncios.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-editar-anuncio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-anuncio.component.html',
  styleUrls: ['./editar-anuncio.component.css']
})
export class EditarAnuncioComponent implements OnInit {
  anuncioId!: string;
  anuncio: any = null;
  nuevaFoto: File | null = null;
  apiUrl = environment.apiUrl;
  provinciaSeleccionada = '';
  provincias: string[] = [];
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
opcionesAtencion = ['Hombres', 'Mujeres', 'Parejas', 'Personas trans', 'No binarios'];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private anunciosService: AnunciosService
  ) {}

  ngOnInit(): void {
    this.anuncioId = this.route.snapshot.params['id'];
    this.anunciosService.getById(this.anuncioId).subscribe({
      next: (data) => {
        this.anuncio = data;
      },
      error: (err) => {
        console.error('Error al cargar anuncio:', err);
        alert('❌ No se pudo cargar el anuncio');
      }
    });
    this.provincias = Object.keys(this.zonasPorProvincia); 
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      this.nuevaFoto = file;
    }
  }
  
toggleSeleccion(opcion: string) {
  const index = this.anuncio.atencion.indexOf(opcion);
  if (index > -1) {
    this.anuncio.atencion.splice(index, 1);
  } else {
    this.anuncio.atencion.push(opcion);
  }
}

guardarCambios(): void {
  if (!this.anuncio) return;

  const formData = new FormData();
  formData.append('alias', this.anuncio.alias || '');
  formData.append('edad', this.anuncio.edad?.toString() || '');
  formData.append('zona', this.anuncio.zona || '');
  formData.append('contacto', this.anuncio.contacto || '');
  formData.append('genero', this.anuncio.genero || '');
  formData.append('etnia', this.anuncio.etnia || '');
  // formData.append('medalla', this.anuncio.medalla || '');
  formData.append('descripcion', this.anuncio.descripcion || '');

  // 👉 Se agrega el campo 'atencion' como JSON string
  if (Array.isArray(this.anuncio.atencion)) {
    formData.append('atencion', JSON.stringify(this.anuncio.atencion));
  }

  if (this.nuevaFoto) {
    formData.append('foto', this.nuevaFoto);
  }

  this.anunciosService.updateAnuncio(this.anuncioId, formData).subscribe({
    next: () => {
      alert('✅ Anuncio actualizado correctamente');
      this.router.navigate(['/mis-anuncios']);
    },
    error: (err) => {
      console.error('Error al actualizar:', err);
      alert('❌ Error al actualizar el anuncio');
    }
  });
}

}
