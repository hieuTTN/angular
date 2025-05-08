import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-regis',
  standalone:false,
  templateUrl: './regis.html',
  styleUrl:'../../../style/user.css'
})


export class RegisComponent{

  password: string = '';
  repassword: string = '';
  email: string = '';
  fullname: string = '';
  address: string = '';
  phone: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}


  async regis() {
    const url = 'http://localhost:8080/api/regis';
    const user = {
      fullname: this.fullname,
      email: this.email,
      phone: this.phone,
      password: this.password,
      address :this.address,
    };
    console.log(user);
    
    this.http.post<any>(url, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (result) => {
        Swal.fire({
          title: "Thông báo",
          text: "Đăng ký thành công! hãy check email của bạn!",
          icon: "success"
        }).then(() => {
          window.location.href = '/confirm?email='+this.email
        });
      },
      (errorResponse) => {
        // Error response
        if (errorResponse.status === 417) {
          const result = errorResponse.error;
          this.toastr.warning(result.defaultMessage);
        }
      }
    );
  }
}