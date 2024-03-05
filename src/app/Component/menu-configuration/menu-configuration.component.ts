import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../../api.service';
import { PopupComponent } from '../popup/popup.component';
import { Observable, map, catchError, switchMap } from 'rxjs';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
interface menuConfigPayLoad {
  id: number;
  menuName: string;
  menuUrl: string;
  isActive: boolean;
}
interface filterData {
  searchTerm?: string | null,
  isActive?: boolean | null,
}

@Component({
  selector: 'app-menu-configuration',
  templateUrl: './menu-configuration.component.html',
  styleUrl: './menu-configuration.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})

export class MenuConfigurationComponent {
  menuView: Array<menuConfigPayLoad> = [];
  editIndex: number = -1;

  payload: menuConfigPayLoad = {
    menuName: "",
    id: 0,
    menuUrl: "",
    isActive: false,
  };

  isEditAndDeleteVisiable: boolean = true;

  datafilter: filterData = {
    searchTerm: null,
    isActive: null
  }

  constructor(private apiService: APIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllMenu();

  }
  getAllMenu() {
    let url = '/User/GetAllMenus';

    if (this.datafilter.searchTerm !== null) {
      url += `?SearchTerm=${this.datafilter.searchTerm}`;
    }

    this.apiService.get(url).subscribe(
      res => {
        this.menuView = [];
        for (const item of res.key) {
          this.menuView.push(item);
        }
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }
  getMenuById(id: number): Observable<menuConfigPayLoad> {
    const url = `/User/GetMenuById?MenuId=${id}`;
    return this.apiService.get(url).pipe(
      map(res => {
        return res.key;
      }),
      catchError(error => {
        console.error('Error fetching user by Id:', error);
        throw error;
      })
    );
  }



  editUser(index: number): void {
    this.initialUserInput(index);
    this.editIndex = index;
    this.isEditAndDeleteVisiable = false;
  }
  initialUserInput(index: number) {
    this.payload = {
      menuName: this.menuView[index].menuName,
      id: this.menuView[index].id,
      menuUrl: this.menuView[index].menuUrl,
      isActive: this.menuView[index].isActive,
    };
  }
  saveMenu(index: number): void {
    this.apiService.post(this.payload, "/User/UpdateMenu").pipe(
      switchMap(() => this.getMenuById(this.menuView[index].id))
    ).subscribe(
      updatedData => {
        this.menuView[index] = updatedData;
        this.openPopup("Update SucessFull", "OK", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
      },
      error => {
        console.error('Error in POST API:', error);
      }
    );

    this.editIndex = -1;
    this.isEditAndDeleteVisiable = true;
  }
  deleteMenu(index: number) {
    const UserId = this.menuView[index].id;
    this.apiService.post(UserId, "/User/DeleteMenuById").subscribe(
      res => {
        if (res.statusCode === 200) {
          this.menuView.splice(index, 1);
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
  cancelEdit(): void {

    this.editIndex = -1;
    this.isEditAndDeleteVisiable = true;
  }

  ResetSearchTerm() {
    this.datafilter.searchTerm = null;
    this.datafilter.isActive = null;
    this.getAllMenu();
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
        this.deleteMenu(index);
      }
    });
  }
  openPopupConfrimationForUpdate(index: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: { "Do you want to delete": String, "https://cdn-icons-png.flaticon.com/512/574/574433.png": String },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.saveMenu(index);
      }
    });
  }
}
