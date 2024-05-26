import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface LoginRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  jwt: string;
}

const BASE_URL = 'http://localhost:8081/';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private tokenKey = 'jwt';
  isLoggedIn(): boolean {
    const token = this.getToken();
 
    return !!token; 
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  destroyToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  constructor(private http: HttpClient) { }

  register(signRequest: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL}signup`, signRequest).pipe(
      catchError(error => throwError(error))
    );
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${BASE_URL}login`, loginRequest).pipe(
      catchError(error => throwError(error))
    );
  }

  hello(): Observable<any> {
    return this.http.get(`${BASE_URL}api/hello`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(error => throwError(error))
    );
  }

  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    let headers = new HttpHeaders();
    if (jwtToken) {
      console.log("JWT token found in local storage:", jwtToken);
      headers = headers.set("Authorization", "Bearer " + jwtToken);
    } else {
      console.log("JWT token not found in local storage");
    }
    return headers;
  }
}