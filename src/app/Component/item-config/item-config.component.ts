import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, NgModel, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../../api.service';
import { Observable, map, catchError, switchMap } from 'rxjs';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
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
interface filterData {
  searchTerm?: string | null,
  isActive?: boolean | null,
}

@Component({
  selector: 'app-item-config',
  templateUrl: './item-config.component.html',
  styleUrl: './item-config.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ItemConfigComponent {
  itemType: CommonDDL[] = [];
  itemView: item[] = [];
  datafilter: filterData = {
    searchTerm: null,
    isActive: null
  }
  payloadItem: item = {
    id: 0,
    itemTypeId: 0,
    itemName: '',
    unitPriceSell: 0,
    unitPricePurchase: 0,
    stockQuantity: 0,
    isActive: false
  }
  editIndex: number = -1;
  isEditAndDeleteVisiable: boolean = true;

  constructor(private apiService: APIService, private dialog: MatDialog) {
    this.getAllItem();
    this.getItemType();
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



  getAllItem() {
    const url = "/User/getAllItem?" + (this.datafilter.isActive != null ? "IsActive=" + this.datafilter.isActive : "") +
      (this.datafilter.searchTerm != null ? "SearchTerm=" + this.datafilter.searchTerm : "");

    this.apiService.get(url).subscribe(
      res => {
        this.itemView = [];
        for (const item of res.key) {
          this.itemView.push(item);
        }
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }
  GetItemById(id: number): Observable<item> {
    const url = `/User/GetItemById?Id=${id}`;
    return this.apiService.get(url).pipe(
      map(res => {
        return res.key as item;
      }),
      catchError(error => {
        console.error('Error fetching Item by Id:', error);
        throw error;
      })
    );
  }



  editItem(index: number): void {
    this.initialItemInput(index);
    this.editIndex = index;
    this.isEditAndDeleteVisiable = false;
  }

  initialItemInput(index: number) {
    this.payloadItem = {
      id: this.itemView[index].id,
      itemTypeId: this.itemView[index].itemTypeId,
      itemName: this.itemView[index].itemName,
      unitPriceSell: this.itemView[index].unitPriceSell,
      unitPricePurchase: this.itemView[index].unitPricePurchase,
      stockQuantity: this.itemView[index].stockQuantity,
      isActive: this.itemView[index].isActive,
    };
  }

  saveItem(index: number): void {
    this.apiService.post(this.payloadItem, "/User/UpdateItem").pipe(
      switchMap(() => this.GetItemById(this.itemView[index].id))
    ).subscribe(
      updatedItem => {
        this.itemView[index] = updatedItem;
        this.openPopup("Update SucessFull", "OK", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
      },
      error => {
        console.error('Error in POST API:', error);
      }
    );

    this.editIndex = -1;
    this.isEditAndDeleteVisiable = true;
  }

  cancelEdit(): void {

    this.editIndex = -1;
    this.isEditAndDeleteVisiable = true;
  }

  deleteItem(index: number) {
    const itemid = this.itemView[index].id;
    this.apiService.post(itemid, "/User/DeleteItem").subscribe(
      res => {
        this.itemView.splice(index, 1);
        this.openPopup(res.message, "OK", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }
  getItemTypeNameById(id: number): string {
    const name = this.itemType.find(x => x.value === id)?.name ?? '';
    return name;
  }
  ResetSearchTerm() {
    this.datafilter.searchTerm = null;
    this.datafilter.isActive = null;
    this.getAllItem();
  }
  openPopup(message: string, action: string, imgsource: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { message, action, imgsource },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Popup closed');
    });
  }
  openPopupConfrimationForDelete(index: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: { "Do you want to delete": String, "https://cdn-icons-png.flaticon.com/512/574/574433.png": String },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteItem(index);
      }
    });
  }
  openPopupConfrimationForUpdate(index: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: { "Do you want to delete": String, "https://cdn-icons-png.flaticon.com/512/574/574433.png": String },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.saveItem(index);
      }
    });
  }
}
