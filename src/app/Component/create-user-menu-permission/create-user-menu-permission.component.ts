import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../../api.service';
import { PopupComponent } from '../popup/popup.component';
import { NgSelectModule } from '@ng-select/ng-select';
interface CommonDDL {
  value: number,
  name: string
}
interface filterData {
  searchTerm?: string | null,
  isActive?: boolean | null,
}
@Component({
  selector: 'app-create-user-menu-permission',
  templateUrl: './create-user-menu-permission.component.html',
  styleUrl: './create-user-menu-permission.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule]
})
export class CreateUserMenuPermissionComponent {
  requestForm!: FormGroup;
  users: CommonDDL[] = [];
  menus: CommonDDL[] = [];
  datafilter: filterData = {
    searchTerm: null,
    isActive: null
  }

  constructor(private fb: FormBuilder, private apiService: APIService, private dialog: MatDialog) {
    this.initializeForm();
  }
  initializeForm(): void {
    this.getUserDDL();
    this.requestForm = this.fb.group({
      menuId: ['', Validators.required],
      userId: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }
  getMenuDDL() {
    let urlddl = "/Menu/GetMenuDDL";
    if (this.datafilter.searchTerm) {
      urlddl += `?UserId=${this.datafilter.searchTerm}`;
    }
    this.apiService.get(urlddl).subscribe(
      res => {
        this.menus = res.key;
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }
  onUserChange() {
    this.datafilter.searchTerm = this.requestForm.value.userId
    this.getMenuDDL();
  }
  getUserDDL() {
    const urlddl = "/User/GetUserDDL";
    this.apiService.get(urlddl).subscribe(
      res => {
        this.users = res.key;
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  onSubmit(): void {
    const url = "/Menu/CreateUpdateUserMenuPermission";
    this.apiService.post(this.requestForm.value, url).subscribe(res => {
      this.openPopup(res.message, "Ok", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
      this.initializeForm();
    }, error => {
      this.openPopup("Faild to Create", "Try Again", "https://cdn-icons-png.flaticon.com/512/1047/1047711.png");
    });
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
