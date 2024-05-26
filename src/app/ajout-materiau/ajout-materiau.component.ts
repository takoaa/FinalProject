import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatamatService } from '../datamat.service';
import { Materiau } from '../models/materiau.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-ajout-materiau',
  templateUrl: './ajout-materiau.component.html',
  styleUrls: ['./ajout-materiau.component.css']
})
export class AjoutMateriauComponent {
  constructor(
    private datamatService: DatamatService,
    public dialogRef: MatDialogRef<AjoutMateriauComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { materiau: Materiau }
  ) {}

  submitForm(form: NgForm): void {
    if (form.valid) {
      const operation = this.data.materiau.id ?
        this.datamatService.updateMateriau(this.data.materiau.id, this.data.materiau) :
        this.datamatService.addMateriau(this.data.materiau);

      operation.subscribe({
        next: () => this.dialogRef.close(true),  // Notify of success
        error: (error) => this.dialogRef.close(false) // Notify of failure
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}