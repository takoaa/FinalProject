
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


import { Observable, Subscription } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { Forme } from '../models/forme';
import { FormesService } from '../formes.service';
import { AjoutFormesComponent } from '../ajout-formes/ajout-formes.component';

import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-formes',
  templateUrl: './formes.component.html',
  styleUrl: './formes.component.css'
})
export class FormesComponent  implements OnInit {
  isVisible: boolean = true;  // Declare and initialize isVisible
  formes$: Observable<Forme[]> = this.formesService.getFormes();
 
  constructor(
    private route: ActivatedRoute,
 
    private formesService: FormesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.formes$ = this.formesService.getFormes(); // Subscribe to the observable to fetch formes

    // Use route parameters to possibly filter or initiate specific actions
    this.route.queryParams.subscribe(params => {
      if (params['nom'] && params['description']) {
        const forme: Forme = {
          id: params['id'],
          nom: params['nom'],
          description: params['description'],

          image: params['image'] || undefined
        };
        this.formesService.addForme(forme); // Add new forme via service if route params exist
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutFormesComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

  }

