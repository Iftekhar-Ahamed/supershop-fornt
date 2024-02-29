import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { APIService } from '../../api.service';
import { UserDataService } from '../../user-data.service';
import { MatDialog } from '@angular/material/dialog';
interface menuItem {
  id: number,
  menuName: string,
  menuUrl: string,
  isActive: boolean
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Change styleUrl to styleUrls
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatButtonModule, MatListModule, RouterLink],
})

export class HomeComponent {
  menuItems: menuItem[] = [];
  showFiller = false;

  constructor(private apiService: APIService, private dataservice: UserDataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.refreshPage();
  }
  refreshPage() {
    this.getUserMenu();
  }
  getUserMenu() {
    const url = "/User/GetMenuPermissionByUserId?UserId=" + this.dataservice.userInfo.id;
    this.apiService.get(url).subscribe(
      res => {
        this.menuItems = res.key;
      },
      (log) => {

      }
    )
  }
}
