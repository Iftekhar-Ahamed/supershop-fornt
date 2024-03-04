import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  message: string = '';
  twobutton: boolean = false;
  imgsrc: string = '';
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,

    @Inject(MAT_DIALOG_DATA) public data: { message: string, imgsrc: string }
  ) {
    this.message = data.message;
    console.log(this.message);
  }
  onNoClick(): void {
    this.dialogRef.close('no');
  }

  onYesClick(): void {
    this.dialogRef.close('yes');
  }

  close(): void {
    this.dialogRef.close();
  }
}
