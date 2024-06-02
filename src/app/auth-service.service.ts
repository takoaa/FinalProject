import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('jwt'));

  get isLoggedIn(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  login(token: string): void {
    localStorage.setItem('jwt', token);
    this.loggedInStatus.next(true);  // Immediately updates the status
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.loggedInStatus.next(false);  // Immediately updates the status
  }
}
