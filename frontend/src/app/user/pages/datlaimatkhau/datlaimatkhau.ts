import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-confirm',
  standalone:false,
  templateUrl: './datlaimatkhau.html',
  styleUrl:'../../../style/user.css'
})
export class DatLaiMatKhauComponent implements OnInit {
  password: string = ''; 
  repassword: string = '';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {}

  async datlaimatkhau() {
    var uls = new URL(document.URL)
    var email = uls.searchParams.get("email");
    var key = uls.searchParams.get("key");
    console.log(this.password);
    console.log(this.repassword);
    
    if(this.password == '' || this.repassword == ''){
      this.toastr.error("Mật khẩu không được để trống");
      return;
    }
    if(this.password != this.repassword){
      this.toastr.error("Mật khẩu không trùng khớp");
      return;
    }

    const url = `http://localhost:8080/api/public/dat-lai-mat-khau?email=${email}&key=${key}&password=${this.password}`;
  
    try {
      // Gửi yêu cầu với responseType: 'text'
      const response = await lastValueFrom(
        this.http.post(url, {}, { observe: 'response', responseType: 'text' })
      );
  
      // Kiểm tra status code
      if (response.status < 300) {
        Swal.fire({
          title: "Thông báo",
          text: "Đặt lại mật khẩu thành công",
          icon: "success"
        }).then(() => {
          window.location.href = '/login';
        });
      }
    } catch (error: any) {
      // Log lỗi để kiểm tra
      console.error('Error occurred:', error);
  
      if (error.status === 417) {
        this.toastr.error(error.error?.defaultMessage || 'Lỗi không xác định');
      } else {
        this.toastr.error("Đã xảy ra lỗi, vui lòng thử lại!");
      }
    }
  }
}