import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class EditarAnuncioComponent implements OnInit, OnDestroy {
  anuncioId!: string;
  anuncio: any = null;
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

  // Nuevas fotos (multi, igual que en "crear")
  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private anunciosService: AnunciosService
  ) {}

  ngOnInit(): void {
    this.anuncioId = this.route.snapshot.params['id'];
    this.provincias = Object.keys(this.zonasPorProvincia);

    this.anunciosService.getById(this.anuncioId).subscribe({
      next: (data: any) => {
        this.anuncio = this.normalizeAnuncio(data);
        this.provinciaSeleccionada = this.anuncio.provincia || '';
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar anuncio:', err);
        this.loading = false;
        alert('❌ No se pudo cargar el anuncio');
      }
    });
  }

  ngOnDestroy(): void {
    this.previewUrls.forEach(u => { try { URL.revokeObjectURL(u); } catch {} });
  }

  // ===== Helpers =====
  private normalizeAnuncio(a: any) {
    const fotos = Array.isArray(a?.fotos) ? a.fotos : (a?.foto ? [a.foto] : []);
    return { ...a, fotos };
  }

  getImageSrc(f: any): string {
    if (!f) return '';
    const s = typeof f === 'string' ? f : (f?._id || f?.id || f?.path || '');
    if (!s) return '';
    if (s.startsWith('http://') || s.startsWith('https://')) return s;
    if (s.startsWith('/')) return `${this.apiUrl}${s}`;
    return `${this.apiUrl}/api/images/${s}`;
  }

  private extractIdFromSrc(src: any): string {
    if (!src) return '';
    const s = typeof src === 'string' ? src : (src?._id || src?.id || src?.path || '');
    if (!s) return '';
    const m = String(s).match(/\/api\/images\/([^\/?#]+)/);
    return m ? m[1] : String(s);
  }

  onImgError(_index: number) {}

  // ===== Chips atencion =====
  toggleSeleccion(opcion: string) {
    if (!Array.isArray(this.anuncio.atencion)) this.anuncio.atencion = [];
    const i = this.anuncio.atencion.indexOf(opcion);
    if (i > -1) this.anuncio.atencion.splice(i, 1);
    else this.anuncio.atencion.push(opcion);
  }

  // ===== Fotos (igual que en "crear") =====
  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    const admitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (!admitidos.includes(f.type) || f.size > 6 * 1024 * 1024) continue;

      this.selectedFiles.push(f);

      const reader = new FileReader();
      reader.onload = (e: any) => this.previewUrls.push(e.target.result);
      reader.readAsDataURL(f);
    }
    event.target.value = '';
  }

  // Quitar foto nueva (solo UI)
  removeImage(i: number) {
    this.selectedFiles.splice(i, 1);
    this.previewUrls.splice(i, 1);
  }

  // Quitar foto EXISTENTE (solo UI; se persiste al guardar con fotosExistentes)
  eliminarFoto(i: number) {
    if (!Array.isArray(this.anuncio.fotos)) this.anuncio.fotos = [];
    this.anuncio.fotos.splice(i, 1);
  }

  // ===== Guardar =====
  private debugFormData(fd: FormData) {
    // @ts-ignore
    for (const [k, v] of (fd as any).entries()) {
      const info = v instanceof File ? `File(${v.name}, ${v.type}, ${v.size})` : String(v);
      console.log(`[FD] ${k} -> ${info}`);
    }
  }

  guardarCambios(): void {
    if (!this.anuncio) return;

    this.anuncio.provincia = this.provinciaSeleccionada || this.anuncio.provincia || '';

    // IDs de fotos existentes a conservar (las que quedan en this.anuncio.fotos)
    const fotosExistentesIds: string[] = (this.anuncio.fotos ?? [])
      .map((f: any) => this.extractIdFromSrc(f))
      .filter(Boolean);

    const fd = new FormData();
    fd.append('alias', this.anuncio.alias ?? '');
    fd.append('edad', String(this.anuncio.edad ?? ''));
    fd.append('provincia', this.anuncio.provincia ?? '');
    fd.append('zona', this.anuncio.zona ?? '');
    fd.append('contacto', this.anuncio.contacto ?? '');
    fd.append('genero', this.anuncio.genero ?? '');
    fd.append('etnia', this.anuncio.etnia ?? '');
    fd.append('descripcion', this.anuncio.descripcion ?? '');
    fd.append('atencion', JSON.stringify(this.anuncio.atencion ?? []));
    fd.append('fotosExistentes', JSON.stringify(fotosExistentesIds));

    // ➕ Nuevas imágenes: usar la MISMA clave que en "crear"
    this.selectedFiles.forEach(file => {
      fd.append('fotos', file); // debe coincidir con upload.array('fotos') / fields({ name:'fotos' })
    });

    this.debugFormData(fd); // verificá que salga 'fotos' y NO 'foto'/'fotosNuevas'

    this.anunciosService.updateAnuncio(this.anuncioId, fd).subscribe({
      next: (_res: any) => {
        this.previewUrls.forEach(u => { try { URL.revokeObjectURL(u); } catch {} });
        this.previewUrls = [];
        this.selectedFiles = [];
        alert('✅ Anuncio actualizado');
        this.router.navigate(['/mis-anuncios']);
      },
      error: (err: any) => {
        console.error('❌ Error al actualizar:', err);
        alert('❌ Error al actualizar el anuncio');
      }
    });
  }
}
