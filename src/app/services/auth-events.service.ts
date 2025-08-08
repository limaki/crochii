// src/app/services/auth-events.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthEventsService {
  private _authChanged = new Subject<void>();
  authChanged$ = this._authChanged.asObservable();

  /** Llamalo cuando cambie el estado de sesión */
  notifyAuthChanged() {
    this._authChanged.next();
  }
}
