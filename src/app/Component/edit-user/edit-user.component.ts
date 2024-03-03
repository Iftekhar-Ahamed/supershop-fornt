import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface User {
  userTypeName: string;
  id: number;
  userTypeId: number;
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
  userlist: Array<User> = [];
  editIndex: number = -1;
  userType: CommonDDL[] = [];

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
        this.userlist = [];
        for (const item of res.key.data) {
          this.userlist.push(item);
        }
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }
  editUser(index: number): void {
    this.editIndex = index;
    this.isEditAndDeleteVisiable = false;
  }

  saveUser(index: number): void {
    const selectedUserType = this.userType.find(x => x.value === this.userlist[index].userTypeId);
    console.log(this.userType, this.userlist[index].userTypeId);
    if (selectedUserType) {
      console.log(selectedUserType)
      this.userlist[index].userTypeName = selectedUserType.name;
    }

    console.log(this.userlist[index]);
    // this.apiService.post(this.userlist[index], "/User/UpdateUserById").subscribe(
    //   res => {
    //     console.log(res);
    //   },
    //   (error) => {
    //     console.error('Error fetching todos:', error);
    //   }
    // );
    this.editIndex = -1;
    this.isEditAndDeleteVisiable = true;
  }

  cancelEdit(): void {
    // Exit edit mode without saving changes
    this.editIndex = -1;
    this.isEditAndDeleteVisiable = true;
  }

  deleteUser(index: number) {

  }
  ResetSearchTerm() {
    this.datafilter.searchTerm = null;
    this.datafilter.isActive = null;
    this.getAllUser();
  }
}
