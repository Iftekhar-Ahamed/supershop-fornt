import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  message: string = '';
  imgsource: string = '';
  action: string = '';

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imgsource: string, action: string, message: string }
  ) {
    this.message = data.message;
    this.action = data.action;
    this.imgsource = data.imgsource;
  }

  close(): void {
    this.dialogRef.close();
  }
}
