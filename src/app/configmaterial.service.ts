import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materiau } from './models/materiau.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigmaterialService {
  private baseUrl = 'http://localhost:8081/api/matiere';

  constructor(private http: HttpClient) {}

  getAllMatieres(): Observable<Materiau[]> {
    return this.http.get<Materiau[]>(this.baseUrl);
  }

  createMateriau(materiau: Materiau): Observable<Materiau> {
    return this.http.post<Materiau>(this.baseUrl, materiau);
  }
  
  updateMatiere(id: number, materiau: Materiau): Observable<Materiau> {
    return this.http.put<Materiau>(`${this.baseUrl}/${id}`, materiau);
  }
  
  deleteMatiere(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}