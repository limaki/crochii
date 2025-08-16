import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnunciosService } from '../../services/anuncios.service'; // adaptá la ruta
import { Router } from '@angular/router';


@Component({
  selector: 'app-anunciarme',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './anunciarme.component.html',
  styleUrl: './anunciarme.component.css'
})
export class AnunciarmeComponent implements OnInit{
  nuevoPerfil: any = {
    alias: '',
    edad: null,
    zona: '',
    genero: '',
    etnia: '',
    descripcion: '',
    medalla: '',
    contacto: '',
    provincia: '',
    atencion: [] 
  };
  opcionesAtencion: string[] = [
    'Hombres',
    'Mujeres',
    'Parejas',
    'Personas trans',
  ];


  

  provincias: string[] = [];
  provinciaSeleccionada = '';

  // 🔥 Ahora múltiples archivos
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
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

  constructor(private anunciosService: AnunciosService, private router: Router) {}

ngOnInit(): void {
  this.provincias = Object.keys(this.zonasPorProvincia); 
}

toggleSeleccion(opcion: string) {
  const index = this.nuevoPerfil.atencion.indexOf(opcion);
  if (index > -1) {
    this.nuevoPerfil.atencion.splice(index, 1);
  } else {
    this.nuevoPerfil.atencion.push(opcion);
  }
}

// ✅ seleccionar varias fotos
onFilesSelected(event: any) {
  const files: FileList = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    this.selectedFiles.push(file);

    // generar preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrls.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

// ✅ eliminar foto antes de enviar
removeImage(index: number) {
  this.selectedFiles.splice(index, 1);
  this.previewUrls.splice(index, 1);
}

publicar(): void {
  this.nuevoPerfil.provincia = this.provinciaSeleccionada;
  const formData = new FormData();

  // Pasamos el resto de los campos
  Object.entries(this.nuevoPerfil).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });

  // Adjuntar TODAS las imágenes
  this.selectedFiles.forEach((file, i) => {
    formData.append('fotos', file); // 👈 el backend debe aceptar `fotos[]`
  });

  this.anunciosService.createAnuncio(formData).subscribe({
    next: (res: { _id: string }) => {
      if (res?._id) {
        localStorage.setItem('anuncioId', res._id);
        console.log('✅ Anuncio creado:', res);
        this.router.navigate(['/anuncios']);
      }
    },
    error: (err) => {
      console.error('❌ Error al publicar el anuncio:', err);
      alert('Ocurrió un error al publicar el anuncio. Inténtalo más tarde.');
    }
  });
}
  
}
