import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, catchError, switchMap } from 'rxjs';
import { APIService } from '../../api.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { PopupComponent } from '../popup/popup.component';
interface ItemType {
  id: number;
  itemTypeName: string;
  uom: string;
  isActive: boolean;
}
interface filterData {
  searchTerm?: string | null,
  isActive?: boolean | null,
}

@Component({
  selector: 'app-item-type-config',
  templateUrl: './item-type-config.component.html',
  styleUrl: './item-type-config.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})

export class ItemTypeConfigComponent {
  editIndex: number = -1;

  itemTypeView: Array<ItemType> = [];

  payload: ItemType = {
    id: 0,
    itemTypeName: "",
    uom: "",
    isActive: true
  };


  isEditAndDeleteVisiable: boolean = true;

  datafilter: filterData = {
    searchTerm: null,
    isActive: null
  }

  constructor(private apiService: APIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllItemType();
  }

  getAllItemType() {
    let url = `/User/GetAllItemType`;
    if (this.datafilter.searchTerm) {
      url += `?SearchTerm=${this.datafilter.searchTerm}`;
    }
    this.apiService.get(url).subscribe(res => {
      this.itemTypeView = res.key;
    }, (error) => {
      console.log(error);
    });
  }

  deleteMenuPermission(index: number) {
    const itemTypeId = this.itemTypeView[index].id;
    this.apiService.post(itemTypeId, "/User/DeleteItemType").subscribe(
      res => {
        if (res.statusCode === 200) {
          this.itemTypeView.splice(index, 1);
          this.openPopup(res.message, "OK", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
        } else {
          this.openPopup(res.message, "OK", "https://cdn-icons-png.flaticon.com/512/1047/1047711.png");
        }
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }
  getMenuPermissionById(index: number): Observable<ItemType> {
    const url = `/User/GetItemTypeById?Id=${this.itemTypeView[index].id}`;
    return this.apiService.get(url).pipe(
      map((res: any) => res.key as ItemType),
      catchError(error => {
        console.error('Error fetching user by Id:', error);
        throw error;
      })
    );
  }

  updateMenuPermission(index: number): void {
    console.log("OK");
    this.apiService.post(this.payload, "/User/UpdateItemType").pipe(
      switchMap(() => this.getMenuPermissionById(index))
    ).subscribe(
      updatedData => {
        const newdata = updatedData as ItemType;
        this.itemTypeView[index] = newdata;
        this.openPopup("Update Successful", "OK", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
      },
      error => {
        console.error('Error in POST API:', error);
      }
    );

    this.editIndex = -1;
    this.isEditAndDeleteVisiable = true;
  }

  ResetSearchTerm() {
    this.datafilter.searchTerm = null;
    this.datafilter.isActive = null;
    this.getAllItemType();
  }
  editMenuPermission(index: number): void {
    this.initialUserInput(index);
    this.editIndex = index;
    this.isEditAndDeleteVisiable = false;
  }
  initialUserInput(index: number) {
    this.payload = {
      id: this.itemTypeView[index].id,
      itemTypeName: this.itemTypeView[index].itemTypeName,
      uom: this.itemTypeView[index].uom,
      isActive: this.itemTypeView[index].isActive,
    };
  }
  cancelEdit(): void {
    this.editIndex = -1;
    this.isEditAndDeleteVisiable = true;
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
        this.deleteMenuPermission(index);
      }
    });
  }
  openPopupConfrimationForUpdate(index: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: { "Do you want to Update": String, "https://cdn-icons-png.flaticon.com/512/574/574433.png": String },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.updateMenuPermission(index);
      }
    });
  }
}
