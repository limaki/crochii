import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  authStatus$ = this.loggedIn.asObservable();

  updateAuthStatus() {
    this.loggedIn.next(!!localStorage.getItem('token'));
  }

  logout() {
    localStorage.clear();
    this.loggedIn.next(false);
  }
}
