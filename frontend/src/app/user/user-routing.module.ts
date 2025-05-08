import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { UserLayoutComponent } from './layout/user-layout';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }, 
      { path: '', redirectTo: '/404', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Không cần declarations
  exports: [RouterModule]
})
export class UserRoutingModule {}