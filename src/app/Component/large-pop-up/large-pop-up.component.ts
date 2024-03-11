import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-large-pop-up',
  templateUrl: './large-pop-up.component.html',
  styleUrl: './large-pop-up.component.css'
})
export class LargePopUpComponent {
  imgsource: string;
  action: string = '';
  message: string;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imgsource: string, action: string, message: string }
  ) {
    this.message = data.message;
    this.action = data.action;
    this.imgsource = data.imgsource;
  }
  get messageLines(): string[] {
    return this.message.split('\n');
  }
  close(): void {
    this.dialogRef.close();
  }
}
