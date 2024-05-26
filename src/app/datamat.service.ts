import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Materiau } from './models/materiau.model';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatamatService {
  private apiUrl = 'http://localhost:8081/api/matiere';

  constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) {}

  getAllMatieres(): Observable<Materiau[]> {
    return this.http.get<Materiau[]>(`${this.apiUrl}/GetAll`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  addMateriau(materiau: Materiau): Observable<Materiau> {
    return this.http.post<Materiau>(`${this.apiUrl}/add`, materiau, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  updateMateriau(id: number, materiau: Materiau): Observable<Materiau> {
    return this.http.put<Materiau>(`${this.apiUrl}/${id}`, materiau, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  deleteMaterial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteOne/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData).pipe(
      
    );
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const token = this.jwtService.getToken();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401 || error.status === 403) {
      this.jwtService.destroyToken();
      this.router.navigate(['/login']);
      return throwError(() => new Error('Session expired, please log in again'));
    }
    console.error('API error:', error.message);
    return throwError(() => new Error(`An error occurred: ${error.message}`));
  }
}