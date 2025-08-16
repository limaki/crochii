import { Component, AfterViewInit } from '@angular/core';
import { AnunciosComponent } from "./pages/anuncios/anuncios.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

import { RouterOutlet, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

import { gsap } from 'gsap';

// ⬇️ AGREGA ESTOS IMPORTS
import { AgeConsentModalComponent } from './components/age-consent-modal/age-consent-modal.component'; // ajustá la ruta
import { ConsentService } from './services/consent.service'; // ajustá la ruta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AnunciosComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    AgeConsentModalComponent // ⬅️ necesario para renderizar el modal
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  // ⬇️ estado del modal
  showConsent = false;
  private modalShownOnce = false;

  constructor(
    private router: Router,
    private consent: ConsentService // ⬅️ servicio que persiste aceptación
  ) {}

  ngAfterViewInit(): void {
    const overlay = document.getElementById('transition-overlay');

    this.router.events.subscribe(event => {
      // ====== TRANSICIONES (tu lógica original) ======
      if (overlay) {
        if (event instanceof NavigationStart) {
          gsap.to(overlay, {
            opacity: 0.6,
            duration: 0.3,
            ease: 'power2.inOut'
          });
        }

        if (event instanceof NavigationEnd) {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.5,
            delay: 0.1,
            ease: 'power2.out'
          });
        }
      }

      // ====== MODAL 18+ (una sola vez) ======
      if (event instanceof NavigationEnd) {
        // si ya aceptó, nunca lo mostramos
        if (this.consent.hasAccepted()) return;

        // si aún no lo mostramos en este ciclo de vida y no aceptó, abrir
        if (!this.modalShownOnce) {
          this.modalShownOnce = true;
          this.showConsent = true;
        }
      }
    });
  }

  // llamado por (accepted) del modal
  onConsentAccepted(): void {
    this.consent.accept();     // persiste en localStorage
    this.showConsent = false;  // cierra el modal
  }

  // llamado por (declined) del modal
  onConsentDeclined(): void {
    this.showConsent = false;        // cierra el modal
    this.router.navigateByUrl('/');  // redirigí a donde prefieras
  }
}
