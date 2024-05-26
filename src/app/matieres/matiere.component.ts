import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { DatamatService } from '../datamat.service';
import { Materiau } from '../models/materiau.model';
import { AjoutMateriauComponent } from '../ajout-materiau/ajout-materiau.component';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-matieres',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {
  materiaux$!: Observable<Materiau[]>; // This will hold the materials data
  isVisible: boolean = true;  // This is used to show or hide parts of your template
  selectedFile: File | null = null;

  materiaux: Materiau[] = [];

  constructor(
    library: FaIconLibrary,
    private datamatService: DatamatService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
   
    
  ) { library.addIcons(faEdit, faTrashAlt);}

  ngOnInit(): void {
    this.loadInitialData();
  }
  loadInitialData(): void {
    this.materiaux$ = this.datamatService.getAllMatieres();
  }  openDialog(materiau?: Materiau): void {
    const dialogRef = this.dialog.open(AjoutMateriauComponent, {
      width: '300px',
      data: { materiau: materiau || this.createNewMateriau() }
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.loadInitialData();  // Refresh the list if there was a change
      // }
    });
  }

  createNewMateriau(): Materiau {
    return {
      id: undefined, // or null, if your backend supports it
      name: '',
      type: '',
      thicknessOptions: '',
      codeTar: '',
      brilliance: '',
      unit: '',
      characteristics: '',
      faceOptions: ''
    };
  }

  

  updateMatiere(materiau: Materiau): void {
    this.openDialog(materiau);  // Opens the dialog with existing material data
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.datamatService.uploadFile(this.selectedFile).subscribe({
        next: response => {
          this.snackBar.open('Fichier téléchargé avec succès: ' + response, 'Fermé', { duration: 3000 });
          panelClass: ['snackbar-success'] 
          this.loadInitialData(); // Refresh the data after successful upload
        },
        error: error => {
          this.snackBar.open('Fichier importé avec succès: ' , 'Fermé', { duration: 3000 });
         
        }
      });
    } else {
      this.snackBar.open('Aucun fichier sélectionné', 'Fermé', { duration: 3000 });
    }
  }
   deleteMatiere(id: number): void {
    this.datamatService.deleteMaterial(id).subscribe({
      next: () => {
        this.snackBar.open('Matériau supprimé avec succès', 'Fermé', { duration: 6000 });
        this.loadInitialData();
      
      },
      error: error => this.snackBar.open('Échec de la suppression du matériel: ' + error.message, 'Fermé', { duration: 1000 })
    });
  }


saveMateriau(materiau: Materiau): void {
  const operation = materiau.id ? 
    this.datamatService.updateMateriau(materiau.id, materiau) :
    this.datamatService.addMateriau(materiau);
  
  operation.subscribe({
    next: (res) => {
      this.snackBar.open('Material saved successfully', 'Close', { duration: 2000 });
      this.loadInitialData();  // Reload data to refresh the list
    },
    error: (error) => this.snackBar.open('Failed to save material: ' + error.message, 'Close', { duration: 2000 })
  });
}
}