import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../../src/app/Component/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { LogInComponent } from './Component/log-in/log-in.component';
import { PopupComponent } from './Component/popup/popup.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CreateUserComponent } from './Component/create-user/create-user.component';
import { EditUserComponent } from './Component/edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './Component/confirmation/confirmation.component';
import { NotificationReceivedComponent } from './Component/notification-received/notification-received.component';
import { MenuConfigurationComponent } from './Component/menu-configuration/menu-configuration.component';
import { CreateMenuComponent } from './Component/create-menu/create-menu.component';
import { CreateUserMenuPermissionComponent } from './Component/create-user-menu-permission/create-user-menu-permission.component';
import { MenuPermissionConfigComponent } from './Component/menu-permission-config/menu-permission-config.component';
import { CreateItemTypeComponent } from './Component/create-item-type/create-item-type.component';
import { ItemTypeConfigComponent } from './Component/item-type-config/item-type-config.component';
import { CreateItemComponent } from './Component/create-item/create-item.component';
import { ItemConfigComponent } from './Component/item-config/item-config.component';
import { CreateItemTransactionTypeComponent } from './Component/create-item-transaction-type/create-item-transaction-type.component';
import { CreateItemTransactionTypCofigComponent } from './Component/create-item-transaction-typ-cofig/create-item-transaction-typ-cofig.component';
import { ItemTransactionComponent } from './Component/item-transaction/item-transaction.component';
import { RealtimeClientService } from './realtime-client.service';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    ConfirmationComponent,
    NotificationReceivedComponent,

  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LogInComponent,
    HomeComponent,
    CreateUserComponent,
    ReactiveFormsModule,
    FormsModule,
    EditUserComponent,
    MenuConfigurationComponent,
    CreateMenuComponent,
    CreateUserMenuPermissionComponent,
    MenuPermissionConfigComponent,
    CreateItemTypeComponent,
    ItemTypeConfigComponent,
    CreateItemComponent,
    ItemConfigComponent,
    CreateItemTransactionTypeComponent,
    CreateItemTransactionTypCofigComponent,
    ItemTransactionComponent,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

