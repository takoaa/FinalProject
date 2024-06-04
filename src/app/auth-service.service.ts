import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'})
export class AuthService {
    private loggedInStatus = new BehaviorSubject<boolean>(this.checkJWTToken());

    constructor(private http: HttpClient) {}

    get isLoggedIn(): BehaviorSubject<boolean> {
        return this.loggedInStatus;
    }

    private checkJWTToken(): boolean {
        const token = localStorage.getItem('jwt');
        // You can add more complex token validation here if needed
        return !!token;
    }

    // Updated login function that interacts with a server to validate credentials
    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post<{ jwt: string }>('/api/login', credentials).pipe(
            tap(response => {
                if (response.jwt) {
                    localStorage.setItem('jwt', response.jwt);
                    this.loggedInStatus.next(true);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('jwt');
        this.loggedInStatus.next(false);
    }
}
