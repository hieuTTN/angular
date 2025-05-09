import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../shared/services/user/checkout.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone:false,
    templateUrl: './thanhcong.html',
  styleUrl:'../../../style/user.css'
})


export class ThanhCongComponent implements OnInit {
  isLoggedIn: boolean = false;
  isSuccess: boolean = true;
  messError: string = '';

  constructor(
    private toastr: ToastrService,
    private checkoutService: CheckoutService, 
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!window.localStorage.getItem("token");
    if(this.isLoggedIn == false){
      window.location.href = '/login'
    }
    this.kiemTraThanhToan();
  }



  kiemTraThanhToan(){
      this.checkoutService.checkPayMentMomo().subscribe({
        next: () => {
            // window.localStorage.removeItem("orderinfor");
            this.isSuccess = true
        },
        error: (error) => {
            this.messError = error.error.defaultMessage;
            this.isSuccess = false
        }
      });
  }
}