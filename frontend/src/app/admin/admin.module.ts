import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Bắt buộc để toastr hoạt động
import { ToastrModule } from 'ngx-toastr';
import { ProductComponent } from './pages/product/product.component'
import { ProductAddComponent } from './pages/product/productadd';
import { DanhMucComponent } from './pages/danhmuc/danhmuc';
import { TaiKhoanComponent } from './pages/taikhoan/taikhoan';
import { InvoiceComponent } from './pages/invoice/invoice';
import { BannerComponent } from './pages/banner/banner';
import { NhapHangComponent } from './pages/nhaphang/nhaphang';
import { AddNhapHangComponent } from './pages/nhaphang/addnhaphang';
import { BlogComponent } from './pages/blog/blog';
import { AddBlogComponent } from './pages/blog/addblog';
import { IndexComponent } from './pages/index/index.component';


@NgModule({
  declarations: [ProductComponent, ProductAddComponent,DanhMucComponent,TaiKhoanComponent,
    InvoiceComponent,BannerComponent,NhapHangComponent,AddNhapHangComponent,BlogComponent,AddBlogComponent,IndexComponent],
  imports: [
    EditorModule,
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