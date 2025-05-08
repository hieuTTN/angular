import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-user-layout',
  standalone: true, 
  imports: [RouterModule], 
  templateUrl: './user-layout.html',
  styleUrl:'../../style/user.css'
})
export class UserLayoutComponent {

  logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.replace('../login');
  }
}