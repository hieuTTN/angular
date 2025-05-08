import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductAddComponent } from './pages/product/productadd';
import { AdminLayoutComponent } from './layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'index', component: IndexComponent }, // Import standalone component
      { path: 'product', component: ProductComponent }, // Import standalone component
      { path: 'addproduct', component: ProductAddComponent }, // Import standalone component
      { path: '', redirectTo: 'index', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Không cần declarations
  exports: [RouterModule]
})
export class AdminRoutingModule {}