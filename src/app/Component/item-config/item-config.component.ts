import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, NgModel, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../../api.service';
import { Observable, map, catchError, switchMap } from 'rxjs';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { PopupComponent } from '../popup/popup.component';
import { LargePopUpComponent } from '../large-pop-up/large-pop-up.component';
interface item {
  id: number;
  itemTypeId: number;
  itemName: string;
  unitPriceSell: number;
  uom: string;
  unitPricePurchase: number;
  stockQuantity: number;
  isActive: boolean;
  itemTypeName: string;
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
    uom: '',
    itemTypeName: '',
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
    const urlddl = "/Item/GetItemTypeDDL";
    this.apiService.get(urlddl).subscribe(
      res => {
        this.itemType = [];
        for (const item of res.data) {
          this.itemType.push(item);
        }
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }



  getAllItem() {
    const url = "/Item/getAllItem?" + (this.datafilter.isActive != null ? "IsActive=" + this.datafilter.isActive : "") +
      (this.datafilter.searchTerm != null ? "SearchTerm=" + this.datafilter.searchTerm : "");

    this.apiService.get(url).subscribe(
      res => {
        this.itemView = [];
        for (const item of res.data) {
          this.itemView.push(item);
        }
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }
  GetItemById(id: number): Observable<item> {
    const url = `/Item/GetItemById?Id=${id}`;
    return this.apiService.get(url).pipe(
      map(res => {
        return res.data as item;
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
      uom: this.itemView[index].uom,
      itemTypeName: this.itemView[index].itemTypeName,
      unitPricePurchase: this.itemView[index].unitPricePurchase,
      stockQuantity: this.itemView[index].stockQuantity,
      isActive: this.itemView[index].isActive,
    };
  }

  saveItem(index: number): void {
    this.apiService.post(this.payloadItem, "/Item/UpdateItem").pipe(
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
    this.apiService.post(itemid, "/Item/DeleteItem").subscribe(
      res => {
        this.itemView.splice(index, 1);
        this.openPopup(res.message, "OK", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  viewHistory(index: number) {

    const url = `/Log/GetItemLog?TableId=2002&ItemId=${this.itemView[index].id}`;

    this.apiService.get(url).subscribe(
      res => {
        if (res.statusCode === 200) {
          let r = '';
          const data = res.data;
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            r += element + '\n';
          }
          this.openPopupLarge(r, "Close", "https://cdn-icons-png.flaticon.com/512/1960/1960242.png");
        } else {
          this.openPopup("NO LOG HISTORY", "Close", "https://cdn-icons-png.flaticon.com/512/1047/1047711.png");
        }
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
  openPopupLarge(message: string, action: string, imgsource: string): void {
    const dialogRef = this.dialog.open(LargePopUpComponent, {
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
