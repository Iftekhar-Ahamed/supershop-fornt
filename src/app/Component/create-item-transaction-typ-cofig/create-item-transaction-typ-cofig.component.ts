import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, catchError, switchMap } from 'rxjs';
import { APIService } from '../../api.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { PopupComponent } from '../popup/popup.component';

interface transactionType {
  id: number,
  transactionName: string,
  isActive: boolean
}
interface filterData {
  searchTerm?: string | null,
  isActive?: boolean | null,
}


@Component({
  selector: 'app-create-item-transaction-typ-cofig',
  templateUrl: './create-item-transaction-typ-cofig.component.html',
  styleUrl: './create-item-transaction-typ-cofig.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})

export class CreateItemTransactionTypCofigComponent {
  editIndex: number = -1;

  transactionTypeView: Array<transactionType> = [];

  payload: transactionType = {
    id: 0,
    transactionName: "",
    isActive: true
  };


  isEditAndDeleteVisiable: boolean = true;

  datafilter: filterData = {
    searchTerm: null,
    isActive: null
  }

  constructor(private apiService: APIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAlltransactionType();
  }

  getAlltransactionType() {
    let url = `/User/GetAllItemTransactionType`;
    if (this.datafilter.searchTerm) {
      url += `?SearchTerm=${this.datafilter.searchTerm}`;
    }
    this.apiService.get(url).subscribe(res => {

      this.transactionTypeView = res.key;
      console.log(this.transactionTypeView);
    }, (error) => {
      console.log(error);
    });
  }

  deleteMenuPermission(index: number) {
    const transactionTypeId = this.transactionTypeView[index].id;
    this.apiService.post(transactionTypeId, "/User/DeleteItemTransactionType").subscribe(
      res => {
        if (res.statusCode === 200) {
          this.transactionTypeView.splice(index, 1);
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
  getMenuPermissionById(index: number): Observable<transactionType> {
    const url = `/User/GetItemTransactionTypeById?Id=${this.transactionTypeView[index].id}`;
    return this.apiService.get(url).pipe(
      map((res: any) => res.key as transactionType),
      catchError(error => {
        console.error('Error fetching user by Id:', error);
        throw error;
      })
    );
  }

  updateMenuPermission(index: number): void {
    console.log("OK");
    this.apiService.post(this.payload, "/User/UpdateItemTransactionType").pipe(
      switchMap(() => this.getMenuPermissionById(index))
    ).subscribe(
      updatedData => {
        const newdata = updatedData as transactionType;
        this.transactionTypeView[index] = newdata;
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
    this.getAlltransactionType();
  }
  editMenuPermission(index: number): void {
    this.initialUserInput(index);
    this.editIndex = index;
    this.isEditAndDeleteVisiable = false;
  }
  initialUserInput(index: number) {
    this.payload = {
      id: this.transactionTypeView[index].id,
      transactionName: this.transactionTypeView[index].transactionName,
      isActive: this.transactionTypeView[index].isActive,
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