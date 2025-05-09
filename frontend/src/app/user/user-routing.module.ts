import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout';
import { LoginComponent } from './pages/login/login';
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
      { path: 'cart', component: CartComponent }, 
      { path: 'thanhcong', component: ThanhCongComponent }, 
      { path: 'account', component: AccountComponent }, 
      { path: 'blog', component: BlogComponent }, 
      { path: 'blogdetail', component: BlogDetailComponent }, 
      { path: 'detail', component: DetailComponent }, 
      { path: 'product', component: ProductComponent }, 
      { path: '', component: HomeComponent }, 
      { path: '', redirectTo: '/404', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Không cần declarations
  exports: [RouterModule]
})
export class UserRoutingModule {}