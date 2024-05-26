import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormesService} from '../formes.service';

@Component({
  selector: 'app-ajout-formes',
  templateUrl: './ajout-formes.component.html',
  styleUrl: './ajout-formes.component.css'
})
export class AjoutFormesComponent {
  isVisible: boolean = false;

  constructor(
    private formesService: FormesService, // Correct naming and ensure this service is correctly implemented
    public dialogRef: MatDialogRef<AjoutFormesComponent>
  ) { }

  closeDialog(): void {
    this.isVisible = false;
    this.dialogRef.close(); // Close the dialog
  }
  submitForm(nom: string, description: string, image: File | null): void {
    const forme = { nom, description, image };
    this.formesService.addForme(forme); // Assuming addForme expects an object of type Forme
    this.closeDialog();
  }
}
