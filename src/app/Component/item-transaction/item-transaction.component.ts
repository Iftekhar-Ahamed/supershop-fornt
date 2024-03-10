import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../../api.service';
import { PopupComponent } from '../popup/popup.component';
import { Observable, catchError, from, map } from 'rxjs';
interface item {
  id: number;
  itemTypeId: number;
  itemName: string;
  itemTypeName: string;
  uom: string;
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
  selector: 'app-item-transaction',
  templateUrl: './item-transaction.component.html',
  styleUrl: './item-transaction.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ItemTransactionComponent {
  itemForm!: FormGroup;
  itemDDL: CommonDDL[] = [];
  transactionType: CommonDDL[] = [];
  @ViewChild('itemSelect') itemSelect: any;
  editMode: boolean = false;
  constructor(private fb: FormBuilder, private apiService: APIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getItemType();
    this.getTransactionType();
  }

  initializeForm(): void {
    this.itemForm = this.fb.group({
      itemId: [0, Validators.required],
      itemTypeId: [0, Validators.required],
      itemName: ['', Validators.required],
      uom: ['', Validators.required],
      itemTypeName: ['', Validators.required],
      unitPriceSell: [0, Validators.required],
      unitPricePurchase: [0, Validators.required],
      stockQuantity: [0, Validators.required],
      unitOfAmount: [0, Validators.required],
      transactionTypeId: [0, Validators.required],
      isActive: [true, Validators.required]
    });
  }
  setform(item: any): void {
    this.itemForm = this.fb.group({
      itemId: [item.id, Validators.required],
      itemTypeId: [item.itemTypeId, Validators.required],
      itemName: [item.itemName, Validators.required],
      uom: [item.uom, Validators.required],
      itemTypeName: [item.itemTypeName, Validators.required],
      unitPriceSell: [item.unitPriceSell, Validators.required],
      unitPricePurchase: [item.unitPricePurchase, Validators.required],
      stockQuantity: [item.stockQuantity, Validators.required],
      unitOfAmount: [0, Validators.required],
      transactionTypeId: [0, Validators.required],
      isActive: [item.isActive, Validators.required]
    });
  }
  onItemSelected(selectedItem: any) {
    const selectedValue = selectedItem.target.value;
    this.setform(this.GetItemById(selectedValue));
  }
  GetItemById(id: number) {
    const url = `/Item/GetItemById?Id=${id}`;
    return this.apiService.get(url).subscribe(res => {
      this.setform(res.key);
    },
      (error) => {
        console.error('Error fetching todos:', error);
      });
  }

  onSubmit(): void {
    const urlddl = "/Item/MakeTransaction";
    let formData = this.itemForm.value;

    this.apiService.post(formData, urlddl).subscribe(res => {
      if (res.statusCode === 200) {
        this.openPopup(res.message, "Ok", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
        this.initializeForm();
        this.itemSelect.nativeElement.selectedIndex = 0;
      } else {
        this.openPopup(res.message, "Ok", "https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/warning-icon.png");
      }

    }, error => {
      console.log(error.error);
      let e = "";
      for (var key in error.error.errors) {
        e += error.error.errors[key] + '\n';
      }
      this.openPopup(e, "Try Again", "https://cdn-icons-png.flaticon.com/512/1047/1047711.png");
    });
  }

  getItemType() {
    const urlddl = "/Item/GetItemDDL";
    this.apiService.get(urlddl).subscribe(
      res => {
        this.itemDDL = [];
        for (const item of res.key) {
          this.itemDDL.push(item);
        }
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }
  getTransactionType() {
    const urlddl = "/Item/GetItemTransactionTypeDDL";
    this.apiService.get(urlddl).subscribe(
      res => {
        this.transactionType = [];
        for (const item of res.key) {
          this.transactionType.push(item);
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
