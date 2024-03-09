import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../../api.service';
import { PopupComponent } from '../popup/popup.component';
interface transactionType {
  id: number,
  transactionName: string,
  isActive: boolean
}
@Component({
  selector: 'app-create-item-transaction-type',
  templateUrl: './create-item-transaction-type.component.html',
  styleUrl: './create-item-transaction-type.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class CreateItemTransactionTypeComponent {
  itemTransactionTypeFrom!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: APIService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.itemTransactionTypeFrom = this.fb.group({
      id: [0],
      transactionName: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }

  onSubmit(): void {
    const url = "/Item/CreateItemTransactionType";
    const formData: transactionType = this.itemTransactionTypeFrom.value;
    this.apiService.post(formData, url).subscribe(res => {
      this.openPopup(res.message, "Ok", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
      this.initializeForm();
    }, error => {
      this.openPopup("Faild to Create", "Try Again", "https://cdn-icons-png.flaticon.com/512/1047/1047711.png");
    });
  }
  openPopup(message: string, action: string, imgsource: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { message, action, imgsource },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Popup closed');
    });
  }
}
