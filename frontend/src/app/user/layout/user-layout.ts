import { Component,OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { CartService } from '../../shared/services/user/cart.service';

@Component({
  selector: 'app-user-layout',
  standalone: true, 
  imports: [RouterModule,CommonModule], 
  templateUrl: './user-layout.html',
  styleUrl:'../../style/user.css'
})
export class UserLayoutComponent implements OnInit{

  isLoggedIn: boolean = false;
  numCart:number = 0;

  ngOnInit(): void {
    this.isLoggedIn = !!window.localStorage.getItem("token");
    this.loadNumCart();
  }
  constructor(
    private cartService: CartService, 
  ){}

  logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.replace('../login');
  }

  async loadNumCart (){
    if(this.isLoggedIn == false){
      return;
    }
    this.cartService.getNumCart()
    .then(response => {
      return response.text();
    }).then(result  => {
      this.numCart = result;
    })
  }
}