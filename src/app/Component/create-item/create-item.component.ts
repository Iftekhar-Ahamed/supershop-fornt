import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../../api.service';
import { PopupComponent } from '../popup/popup.component';
interface item {
  id: number;
  itemTypeId: number;
  itemName: string;
  unitPriceSell: number;
  unitPricePurchase: number;
  stockQuantity: number;
  isActive: boolean;
}
interface CommonDDL {
  value: number,
  name: string
}

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreateItemComponent {
  itemForm!: FormGroup;
  itemType: CommonDDL[] = [];

  constructor(private fb: FormBuilder, private apiService: APIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getItemType();
  }

  initializeForm(): void {
    this.itemForm = this.fb.group({
      id: [0, Validators.required],
      itemTypeId: [0, Validators.required],
      itemName: ['', Validators.required],
      unitPriceSell: [0, Validators.required],
      unitPricePurchase: [0, Validators.required],
      stockQuantity: [0, Validators.required],
      isActive: [true, Validators.required]
    });
  }

  onSubmit(): void {
    const urlddl = "/Item/CreateItem";
    const formData: item = this.itemForm.value;
    this.apiService.post(formData, urlddl).subscribe(res => {
      this.openPopup(res.message, "Ok", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
      this.initializeForm();
    }, error => {
      this.openPopup("Faild to Create", "Try Again", "https://cdn-icons-png.flaticon.com/512/1047/1047711.png");
    });
  }

  getItemType() {
    const urlddl = "/User/GetItemTypeDDL";
    this.apiService.get(urlddl).subscribe(
      res => {
        this.itemType = [];
        for (const item of res.key) {
          this.itemType.push(item);
        }
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
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
