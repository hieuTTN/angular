import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './pages/login/login'
import { RegisComponent } from './pages/regis/regis';
import { ConfirmComponent } from './pages/confirm/confirm';
import { forgotComponent } from './pages/forgot/forgot';
import { DatLaiMatKhauComponent } from './pages/datlaimatkhau/datlaimatkhau';
import { HomeComponent } from './pages/home/home';

@NgModule({
  declarations: [LoginComponent,RegisComponent,ConfirmComponent,forgotComponent,DatLaiMatKhauComponent,HomeComponent],
  imports: [
    CommonModule,
    RouterModule, 
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
  ],
})
export class UserModule {}