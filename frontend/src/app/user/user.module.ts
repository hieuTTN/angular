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
import { CartComponent } from './pages/cart/cart';
import { ThanhCongComponent } from './pages/thanhcong/thanhcong';
import { AccountComponent } from './pages/taikhoan/account';
import { BlogComponent } from './pages/blog/blog';
import { BlogDetailComponent } from './pages/blog/blogdetail';
import { DetailComponent } from './pages/productdetail/detail';
import { ProductComponent } from './pages/product/product';

@NgModule({
  declarations: [LoginComponent,RegisComponent,ConfirmComponent,forgotComponent,DatLaiMatKhauComponent,
    HomeComponent, CartComponent,ThanhCongComponent,AccountComponent, BlogComponent,BlogDetailComponent,
    DetailComponent,ProductComponent],
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