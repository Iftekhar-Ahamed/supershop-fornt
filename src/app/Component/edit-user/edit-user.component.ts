import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { promises } from 'node:dns';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { PopupComponent } from '../popup/popup.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
interface UserPayLoad {
  userTypeName: string;
  id: number;
  userTypeId: number;
  userName: string;
  userFullName: string;
  connectionId: string | null;
  isActive: boolean;
  password: string;
}
interface User {
  id: number;
  userType: CommonDDL;
  userName: string;
  userFullName: string;
  connectionId: string | null;
  isActive: boolean;
  password: string;
}
interface filterData {
  searchTerm?: string | null,
  isActive?: boolean | null,
}
interface CommonDDL {
  value: number,
  name: string
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})

export class EditUserComponent {
  userView: Array<User> = [];
  editIndex: number = -1;
  userType: CommonDDL[] = [];

  payload: UserPayLoad = {
    userFullName: "",
    id: 0,
    userName: "",
    password: "",
    connectionId: "",
    userTypeId: 0,
    userTypeName: "",
    isActive: false,
  };

  isEditAndDeleteVisiable: boolean = true;

  datafilter: filterData = {
    searchTerm: null,
    isActive: null
  }
  constructor(private apiService: APIService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getAllUser();
    this.getUserType();

  }
  getUserType() {
    const urlddl = "/User/GetUserType";
    this.apiService.get(urlddl).subscribe(
      res => {
        this.userType = [];
        for (const item of res.key) {
          this.userType.push(item);
        }
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }


  getAllUser() {
    const url = "/User/GeAllUser?" + (this.datafilter.isActive != null ? "IsActive=" + this.datafilter.isActive : "") +
      (this.datafilter.searchTerm != null ? "SearchTerm=" + this.datafilter.searchTerm : "");

    this.apiService.get(url).subscribe(
      res => {
        this.userView = [];
        for (const item of res.key.data) {
          var ddl: CommonDDL = {
            value: item.userTypeId,
            name: item.userTypeName
          };
          var newUser: User = {
            id: item.id,
            userName: item.userName,
            userType: ddl,
            userFullName: item.userFullName,
            connectionId: item.connectionId,
            isActive: item.isActive,
            password: item.password
          };
          this.userView.push(newUser);
        }


      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }
  getUserById(id: number): Observable<User> {
    const url = `/User/GetUserInformationById?Id=${id}`;
    return this.apiService.get(url).pipe(
      map(res => {

        const ddl: CommonDDL = {
          value: res.key.userTypeId,
          name: res.key.userTypeName
        };
        const newUser: User = {
          id: res.key.id,
          userName: res.key.userName,
          userType: ddl,
          userFullName: res.key.userFullName,
          connectionId: res.key.connectionId,
          isActive: res.key.isActive,
          password: res.key.password
        };
        console.log(newUser);
        return newUser;
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
      userFullName: this.userView[index].userFullName,
      id: this.userView[index].id,
      userName: this.userView[index].userName,
      password: this.userView[index].password,
      connectionId: this.userView[index].connectionId,
      userTypeId: this.userView[index].userType.value,
      userTypeName: this.userView[index].userType.name,
      isActive: this.userView[index].isActive,
    };
  }
  saveUser(index: number): void {
    this.apiService.post(this.payload, "/User/UpdateUserById").pipe(
      switchMap(() => this.getUserById(this.userView[index].id))
    ).subscribe(
      updatedUser => {
        this.userView[index] = updatedUser;
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

  deleteUser(index: number) {
    const UserId = this.userView[index].id;
    this.apiService.post(UserId, "/User/DeleteUserById").subscribe(
      res => {
        this.userView.splice(index, 1);
        this.openPopup(res.message, "OK", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }
  ResetSearchTerm() {
    this.datafilter.searchTerm = null;
    this.datafilter.isActive = null;
    this.getAllUser();
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
        this.deleteUser(index);
      }
    });
  }
  openPopupConfrimationForUpdate(index: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: { "Do you want to delete": String, "https://cdn-icons-png.flaticon.com/512/574/574433.png": String },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.saveUser(index);
      }
    });
  }
}
