import { Injectable } from '@angular/core';

const CONSENT_KEY = 'ah_age_consent_v1';

@Injectable({ providedIn: 'root' })
export class ConsentService {
  /** ¿El usuario ya aceptó? Se guarda de forma persistente. */
  hasAccepted(): boolean {
    return localStorage.getItem(CONSENT_KEY) === 'true';
  }

  /** Guardar aceptación (no mostrar nunca más). */
  accept(): void {
    localStorage.setItem(CONSENT_KEY, 'true');
  }

  /** Si querés permitir revocar (ej. para debug): */
  revoke(): void {
    localStorage.removeItem(CONSENT_KEY);
  }
}
