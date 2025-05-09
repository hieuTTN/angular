import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Bắt buộc để toastr hoạt động
import { ToastrModule } from 'ngx-toastr';
import { ProductComponent } from './pages/product/product.component'
import { ProductAddComponent } from './pages/product/productadd';
import { DanhMucComponent } from './pages/danhmuc/danhmuc';
import { TaiKhoanComponent } from './pages/taikhoan/taikhoan';
import { InvoiceComponent } from './pages/invoice/invoice';

@NgModule({
  declarations: [ProductComponent, ProductAddComponent,DanhMucComponent,TaiKhoanComponent,InvoiceComponent],
  imports: [
    CommonModule,
    RouterModule, // Đảm bảo RouterModule được import
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
  ],
})
export class AdminModule {}