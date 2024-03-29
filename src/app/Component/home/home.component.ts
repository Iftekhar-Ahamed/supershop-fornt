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
import { CreateMenuComponent } from '../create-menu/create-menu.component';
import { MenuConfigurationComponent } from '../menu-configuration/menu-configuration.component';
import { CreateUserMenuPermissionComponent } from '../create-user-menu-permission/create-user-menu-permission.component';
import { MenuPermissionConfigComponent } from '../menu-permission-config/menu-permission-config.component';
import { CreateItemTypeComponent } from '../create-item-type/create-item-type.component';
import { CreateItemTransactionTypCofigComponent } from '../create-item-transaction-typ-cofig/create-item-transaction-typ-cofig.component';
import { CreateItemTransactionTypeComponent } from '../create-item-transaction-type/create-item-transaction-type.component';
import { CreateItemComponent } from '../create-item/create-item.component';
import { ItemConfigComponent } from '../item-config/item-config.component';
import { ItemTypeConfigComponent } from '../item-type-config/item-type-config.component';
import { ItemTransactionComponent } from '../item-transaction/item-transaction.component';
import { NotificationReceivedComponent } from '../notification-received/notification-received.component';
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
  imports: [CommonModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    RouterLink,
    CreateUserComponent,
    EditUserComponent,
    CreateMenuComponent,
    MenuConfigurationComponent,
    CreateUserMenuPermissionComponent,
    MenuPermissionConfigComponent,
    CreateItemTypeComponent,
    ItemTypeConfigComponent,
    CreateItemComponent,
    ItemConfigComponent,
    CreateItemTransactionTypeComponent,
    CreateItemTransactionTypCofigComponent,
    ItemTransactionComponent]
})

export class HomeComponent {
  menuItems: menuItem[] = [];
  showFiller = false;
  component: string = "Home";
  paginationView: boolean = false;

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
    const url = "/Menu/GetMenuPermissionByUserId?UserId=" + this.dataservice.userInfo.id;
    this.apiService.get(url).subscribe(
      res => {
        this.menuItems = res.data;
      },
      (log) => {

      }
    )
  }
}
