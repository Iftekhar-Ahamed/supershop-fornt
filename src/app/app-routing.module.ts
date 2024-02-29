import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { LogInComponent } from './Component/log-in/log-in.component';
import { CreateUserComponent } from './Component/create-user/create-user.component';

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'login', component: LogInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home', loadChildren: () => import('../app/Component/create-user/create-user.component').then(m => m.CreateUserComponent) },
  { path: 'home/EditUser', component: HomeComponent },
  { path: 'home/CreateUser', component: CreateUserComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
