import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Forme } from './models/forme'; 

@Injectable({
  providedIn: 'root'
})
export class FormesService {

  private formesSource = new BehaviorSubject<Forme[]>([]); 
  constructor() {}

  getFormes(): Observable<Forme[]> {
    return this.formesSource.asObservable();
  }

  
  addForme(forme: Forme): void {
    const currentFormes = this.formesSource.getValue();
    this.formesSource.next([...currentFormes, forme]); 
  }

  getFormeById(id: string): Forme | undefined {
    return this.formesSource.getValue().find(f => f.id === id);
  }
}
export{Forme};