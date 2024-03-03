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
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditUserComponent {
  userlist: User[] = [];
  datafilter: filterData = {
    searchTerm: null,
    isActive: null
  }
  constructor(private apiService: APIService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getAllUser();
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


  editUser(index: number) {

  }
  deleteUser(index: number) {

  }
  ResetSearchTerm() {
    this.datafilter.searchTerm = null;
    this.datafilter.isActive = null;
    this.getAllUser();
  }
}
