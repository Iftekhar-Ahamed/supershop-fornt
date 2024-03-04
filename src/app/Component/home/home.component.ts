import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { APIService } from '../../api.service';
import { UserDataService } from '../../user-data.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from "../create-user/create-user.component";
import { EditUserComponent } from '../edit-user/edit-user.component';
import { RealtimeClientService } from '../../realtime-client.service';
interface menuItem {
  id: number,
  menuName: string,
  menuUrl: string,
  isActive: boolean
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatButtonModule, MatListModule, RouterLink, CreateUserComponent, EditUserComponent]
})

export class HomeComponent {
  menuItems: menuItem[] = [];
  showFiller = false;
  component: string = "";

  constructor(private notify: RealtimeClientService, private apiService: APIService, private dataservice: UserDataService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.refreshPage();
  }
  refreshPage() {
    this.getUserMenu();
  }
  openComponent(name: string) {
    this.component = name;
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
