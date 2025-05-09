import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductAddComponent } from './pages/product/productadd';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { DanhMucComponent } from './pages/danhmuc/danhmuc';
import { TaiKhoanComponent } from './pages/taikhoan/taikhoan';
import { InvoiceComponent } from './pages/invoice/invoice';
import { BannerComponent } from './pages/banner/banner';
import { NhapHangComponent } from './pages/nhaphang/nhaphang';
import { AddNhapHangComponent } from './pages/nhaphang/addnhaphang';
import { BlogComponent } from './pages/blog/blog';
import { AddBlogComponent } from './pages/blog/addblog';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'index', component: IndexComponent }, // Import standalone component
      { path: 'product', component: ProductComponent }, // Import standalone component
      { path: 'addproduct', component: ProductAddComponent }, // Import standalone component
      { path: 'danhmuc', component: DanhMucComponent }, 
      { path: 'taikhoan', component: TaiKhoanComponent }, 
      { path: 'invoice', component: InvoiceComponent }, 
      { path: 'banner', component: BannerComponent }, 
      { path: 'importproduct', component: NhapHangComponent }, 
      { path: 'addimportproduct', component: AddNhapHangComponent }, 
      { path: 'blog', component: BlogComponent }, 
      { path: 'addblog', component: AddBlogComponent }, 
      { path: '', redirectTo: 'index', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Không cần declarations
  exports: [RouterModule]
})
export class AdminRoutingModule {}