import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.html',
  styleUrl:'../../../style/user.css'
})


export class LoginComponent{

  username: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}


  async login() {
    const url = 'http://localhost:8080/api/login';
    const user = {
      username: this.username,
      password: this.password
    };
    console.log(user);
    
    this.http.post<any>(url, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (result) => {
        // Success response
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);

        if (result.user.authorities.name === "ROLE_ADMIN") {
          this.router.navigate(['/admin/index']);
        } else if (result.user.authorities.name === "ROLE_USER") {
          this.router.navigate(['/index']);
        } else if (result.user.authorities.name === "ROLE_EMPLOYEE") {
          this.router.navigate(['/employee/taikhoan']);
        }
      },
      (errorResponse) => {
        // Error response
        if (errorResponse.status === 417) {
          const result = errorResponse.error;
          if (result.errorCode === 300) {
            Swal.fire({
              title: "Thông báo",
              text: "Tài khoản chưa được kích hoạt, đi tới kích hoạt tài khoản!",
              icon: "warning"
            }).then(() => {
              this.router.navigate(['/confirm'], { queryParams: { email: this.username } });
            });
          } else {
            this.toastr.warning(result.defaultMessage);
          }
        }
      }
    );
  }
}