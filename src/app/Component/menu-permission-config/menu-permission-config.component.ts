import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../../api.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { PopupComponent } from '../popup/popup.component';
import { Observable, catchError, map, switchMap } from 'rxjs';
interface menuPermission {
  id: number;
  menuId: number;
  menuName: string;
  userId: number;
  userFullName: string;
  isActive: boolean;
}
interface filterData {
  searchTerm?: string | null,
  isActive?: boolean | null,
}

@Component({
  selector: 'app-menu-permission-config',
  templateUrl: './menu-permission-config.component.html',
  styleUrl: './menu-permission-config.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class MenuPermissionConfigComponent {

  editIndex: number = -1;

  menuPermissionView: Array<menuPermission> = [];

  payload: menuPermission = {
    id: 0,
    menuId: 0,
    menuName: "",
    userId: 0,
    userFullName: "",
    isActive: true
  };

  isEditAndDeleteVisiable: boolean = true;

  datafilter: filterData = {
    searchTerm: null,
    isActive: null
  }

  constructor(private apiService: APIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllMenuPermission();
  }

  getAllMenuPermission() {
    let url = `/Menu/GetAllMenuPermission`;
    if (this.datafilter.searchTerm) {
      url += `?SearchTerm=${this.datafilter.searchTerm}`;
    }
    this.apiService.get(url).subscribe(res => {
      this.menuPermissionView = res.key;
    }, (error) => {
      console.log(error);
    });
  }

  deleteMenuPermission(index: number) {
    const UserId = this.menuPermissionView[index].id;
    this.apiService.post(UserId, "/Menu/DeleteMenuPermissionById").subscribe(
      res => {
        if (res.statusCode === 200) {
          this.menuPermissionView.splice(index, 1);
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
  getMenuPermissionById(index: number): Observable<menuPermission> {
    const url = `/Menu/GetMenuPermissionById?MenuPermissionId=${this.menuPermissionView[index].id}`;
    return this.apiService.get(url).pipe(
      map((res: any) => res.key as menuPermission),
      catchError(error => {
        console.error('Error fetching user by Id:', error);
        throw error;
      })
    );
  }

  updateMenuPermission(index: number): void {
    console.log("OK");
    this.apiService.post(this.payload, "/Menu/CreateUpdateUserMenuPermission").pipe(
      switchMap(() => this.getMenuPermissionById(index))
    ).subscribe(
      updatedData => {
        const newdata = updatedData as menuPermission;
        this.menuPermissionView[index] = newdata;
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
    this.getAllMenuPermission();
  }
  editMenuPermission(index: number): void {
    this.initialUserInput(index);
    this.editIndex = index;
    this.isEditAndDeleteVisiable = false;
  }
  initialUserInput(index: number) {
    this.payload = {
      id: this.menuPermissionView[index].id,
      menuName: this.menuPermissionView[index].menuName,
      menuId: this.menuPermissionView[index].menuId,
      userFullName: this.menuPermissionView[index].userFullName,
      userId: this.menuPermissionView[index].userId,
      isActive: this.menuPermissionView[index].isActive,
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

