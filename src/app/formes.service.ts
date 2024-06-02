import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Forme } from './models/forme';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormesService {
  private apiUrl = 'http://localhost:8081/api/formes';

  constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) {}

  getFormes(): Observable<Forme[]> {
    return this.http.get<Forme[]>(`${this.apiUrl}/GetAll`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  addForme(forme: Forme): Observable<Forme> {
    const formData = this.createFormData(forme);
    return this.http.post<Forme>(`${this.apiUrl}/add`, formData, { headers: this.getHeadersWithoutContentType() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  updateForme(id: number, forme: Forme): Observable<Forme> {
    const formData = this.createFormData(forme);
    return this.http.put<Forme>(`${this.apiUrl}/${id}`, formData, { headers: this.getHeadersWithoutContentType() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  deleteForm(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteOne/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  private createFormData(forme: Forme): FormData {
    const formData = new FormData();
    formData.append('name', forme.name);
    if (forme.image) {
      formData.append('image', forme.image);
    }
    return formData;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtService.getToken()}`,
    });
    return headers;
  }

  private getHeadersWithoutContentType(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtService.getToken()}`,
    });
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

export{Forme}