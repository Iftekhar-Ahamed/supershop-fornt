import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../../api.service';
import { PopupComponent } from '../popup/popup.component';
interface menu {
  id: number;
  menuName: string;
  menuUrl: string;
  isActive: boolean;
}
@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrl: './create-menu.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})

export class CreateMenuComponent {
  menuForm!: FormGroup;
  constructor(private fb: FormBuilder, private apiService: APIService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.menuForm = this.fb.group({
      menuName: ['', Validators.required],
      menuUrl: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }

  onSubmit(): void {
    const url = "/User/CreateMenu";
    const formData: menu = this.menuForm.value;
    this.apiService.post(formData, url).subscribe(res => {
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
