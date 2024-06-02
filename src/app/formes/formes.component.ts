import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FormesService } from '../formes.service';
import { Forme } from '../models/forme';
import { AjoutFormesComponent } from '../ajout-formes/ajout-formes.component';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-formes',
  templateUrl: './formes.component.html',
  styleUrls: ['./formes.component.css']
})
export class FormesComponent implements OnInit {
  formes$!: Observable<Forme[]>;

  constructor(
    library: FaIconLibrary,
    private formesService: FormesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { library.addIcons(faEdit, faTrashAlt); }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.formes$ = this.formesService.getFormes();
  }

  openDialog(forme?: Forme): void {
    const dialogRef = this.dialog.open(AjoutFormesComponent, {
      width: '300px',
      data: { forme: forme || this.createNewForme() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInitialData();
      }
    });
  }

  createNewForme(): Forme {
    return {
      id: undefined,
      name: '',
      image: undefined
    };
  }

  updateForme(forme: Forme): void {
    this.openDialog(forme);
  }

  deleteForme(id: number): void {
    this.formesService.deleteForm(id).subscribe({
      next: () => {
        this.snackBar.open('Forme supprimée avec succès', 'Fermé', { duration: 6000 });
        this.loadInitialData();
      },
      error: (error) => this.snackBar.open('Échec de la suppression de la forme: ' + error.message, 'Fermé', { duration: 1000 })
    });
  }
}
