import { Component, AfterViewInit } from '@angular/core';
import { AnunciosComponent } from "./pages/anuncios/anuncios.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

import { RouterOutlet, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnunciosComponent, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const overlay = document.getElementById('transition-overlay');
    if (!overlay) return;

    this.router.events.subscribe(event => {
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
    });
  }
}