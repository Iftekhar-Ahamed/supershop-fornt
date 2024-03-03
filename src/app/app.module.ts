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

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LogInComponent,
    HomeComponent,
    CreateUserComponent,
    ReactiveFormsModule,
    FormsModule,
    EditUserComponent
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

