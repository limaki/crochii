import { Routes } from '@angular/router';
import { AnunciarmeComponent } from './pages/anunciarme/anunciarme.component';
import { AnunciosComponent } from './pages/anuncios/anuncios.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MisAnunciosComponent } from './pages/mis-anuncios/mis-anuncios.component';
import { AnuncioDetalleComponent } from './pages/anuncio-detalle/anuncio-detalle.component';
import { EditarAnuncioComponent } from './pages/editar-anuncio/editar-anuncio.component';
import { VerificacionBeneficiosComponent } from './pages/verificacion-beneficios/verificacion-beneficios.component';
import { VerificacionExitosaComponent } from './pages/verificacion-exitosa/verificacion-exitosa.component';

export const routes: Routes = [
    {path: 'anunciarme', component: AnunciarmeComponent},
    {path: 'anuncios', component : AnunciosComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component : LoginComponent},
    {path: 'admin', component: AdminComponent },
    {path: 'mis-anuncios', component: MisAnunciosComponent},
    {path: 'verificacion', component: VerificacionBeneficiosComponent},
    {path : 'verificado-exito', component: VerificacionExitosaComponent},
    {path: 'anuncio-individual/:id', component: AnuncioDetalleComponent},
    {path: 'editar-anuncio/:id', component: EditarAnuncioComponent},
    {path: '', pathMatch: 'full', redirectTo: 'anuncios'}
];
