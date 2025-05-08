import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-admin-layout',
  standalone: true, 
  imports: [RouterModule], 
  templateUrl: './admin-layout.component.html',
  styleUrl:'../../style/admin.css'
})
export class AdminLayoutComponent {

  logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = '/login'
  }
}