import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-element-dialog',
  templateUrl: './add-element-dialog.component.html',
  styleUrls: ['./add-element-dialog.component.css']
})
export class AddElementDialogComponent {

  constructor(private dialogRef: MatDialogRef<AddElementDialogComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
    
  }
}
