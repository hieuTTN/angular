import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout';
import { LoginComponent } from './pages/login/login';
import { RegisComponent } from './pages/regis/regis';
import { ConfirmComponent } from './pages/confirm/confirm';
import { forgotComponent } from './pages/forgot/forgot';
import { DatLaiMatKhauComponent } from './pages/datlaimatkhau/datlaimatkhau';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }, 
      { path: 'regis', component: RegisComponent }, 
      { path: 'confirm', component: ConfirmComponent }, 
      { path: 'forgot', component: forgotComponent }, 
      { path: 'datlaimatkhau', component: DatLaiMatKhauComponent }, 
      { path: '', redirectTo: '/404', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Không cần declarations
  exports: [RouterModule]
})
export class UserRoutingModule {}