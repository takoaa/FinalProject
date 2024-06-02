import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormesService } from '../formes.service';
import { Forme } from '../models/forme';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ajout-forme',
  templateUrl: './ajout-formes.component.html',
  styleUrls: ['./ajout-formes.component.css']
})
export class AjoutFormesComponent {
  selectedFile: File | null = null;

  constructor(
    private formesService: FormesService,
    public dialogRef: MatDialogRef<AjoutFormesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { forme: Forme }
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
    this.data.forme.image = this.selectedFile;
  }

  submitForm(form: NgForm): void {
    if (form.valid) {
      const operation = this.data.forme.id ?
        this.formesService.updateForme(this.data.forme.id, this.data.forme) :
        this.formesService.addForme(this.data.forme);

      operation.subscribe({
        next: () => this.dialogRef.close(true),
        error: () => this.dialogRef.close(false)
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
