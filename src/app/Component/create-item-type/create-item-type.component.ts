import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../../api.service';
import { PopupComponent } from '../popup/popup.component';
interface ItemType {
  id: number;
  itemTypeName: string;
  uom: string;
  isActive: boolean;
}

@Component({
  selector: 'app-create-item-type',
  templateUrl: './create-item-type.component.html',
  styleUrl: './create-item-type.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})



export class CreateItemTypeComponent {

  itemTypeFrom!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: APIService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.itemTypeFrom = this.fb.group({
      id: [0],
      itemTypeName: ['', Validators.required],
      uom: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }

  onSubmit(): void {
    const url = "/Item/CreateItemType";
    const formData: ItemType = this.itemTypeFrom.value;
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
