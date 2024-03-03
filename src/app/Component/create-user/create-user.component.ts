import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { APIService } from '../../api.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'console';

interface User {
  id: number;
  userTypeId: number;
  userName: string;
  userFullName: string;
  connectionId: string;
  isActive: boolean;
  password: string;
}
interface CommonDDL {
  value: number,
  name: string
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  userType: CommonDDL[] = [];

  constructor(private fb: FormBuilder, private apiService: APIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getUserType();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      userTypeId: [1, Validators.required],
      userName: ['', Validators.required],
      userFullName: ['', Validators.required],
      connectionId: ['', Validators.required],
      isActive: [true, Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const urlddl = "/User/CreateUser";
    const formData: User = this.userForm.value;
    this.apiService.post(formData, urlddl).subscribe(res => {
      this.openPopup(res.message, "Ok", "https://cdn-icons-png.flaticon.com/512/190/190411.png");
      this.initializeForm();
    }, error => {
      this.openPopup("Faild to Create", "Try Again", "https://cdn-icons-png.flaticon.com/512/1047/1047711.png");
    });
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
  openPopup(message: string, action: string, imgsource: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { message, action, imgsource },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Popup closed');
    });
  }
}
