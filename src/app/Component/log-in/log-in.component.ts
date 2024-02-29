import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { FormsModule, Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LogInComponent {
  users$: Observable<any> | undefined;
  usernameInput: string = '';
  passwordInput: string = '';
  loginForm: any;

  constructor(private apiService: APIService, private router: Router, private dialog: MatDialog, private data: UserDataService) {
  }

  onSubmit() {
    const apiUrl = "/Authentication/LogIn?UserName=" + this.usernameInput + "&PassWord=" + this.passwordInput;
    if (this.usernameInput.length == 0 || this.passwordInput.length == 0) {
      return;
    }
    this.apiService.logIn(apiUrl).subscribe(
      (res) => {
        //console.log(res.key);
        if (res.value.statusCode === 200) {
          this.router.navigate(['/home']);
          this.data.userInfo = res.key;
          const tokenString = res.value.token;
          const tokenArray = tokenString.split(' ');
          this.data.userInfo.userAccessToken = tokenArray[0];
          this.data.userInfo.userRefreshToken = tokenArray[1];
          this.data.setData();
        } else {
          this.openPopup(res.value.message.message);
        }
      },
      (error) => {

        this.openPopup(error);
      }
    );
  }

  openPopup(message: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Popup closed');
    });
  }
}